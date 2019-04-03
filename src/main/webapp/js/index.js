import React from 'react';
import ReactDom from 'react-dom';
import SockJsClient from 'react-stomp';
const randomstring = require('randomstring');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  onMessageReceive = (msg, topic) => {
    this.setState(prevState => ({
      messages: [...prevState.messages, msg]
    }));
  };

  sendMessage = () => {
    try {
      this.clientRef.sendMessage(
        '/app/all',
        JSON.stringify({ message: randomstring.generate(5) })
      );
      return true;
    } catch (e) {
      return false;
    }
  };

  render() {
    const wsSourceUrl =
      window.location.protocol + '//' + window.location.host + '/messages';

    return (
      <div>
        <label>{`Connection state: ${this.state.clientConnected}`}</label>
        <br />
        <label>{`Messages: ${JSON.stringify(this.state.messages)}`}</label>
        <br />
        <button onClick={this.sendMessage}>Send random message</button>

        <SockJsClient
          url={wsSourceUrl}
          topics={['/topic/all']}
          onMessage={this.onMessageReceive}
          ref={client => {
            this.clientRef = client;
          }}
          onConnect={() => {
            this.setState({ clientConnected: true });
          }}
          onDisconnect={() => {
            this.setState({ clientConnected: false });
          }}
          debug={false}
        />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
