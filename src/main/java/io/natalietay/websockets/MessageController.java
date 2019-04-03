package io.natalietay.websockets;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {
    @MessageMapping("/all")
    public Map<String, String> post(@Payload Map<String, String> message) {
        sendTo(message);
        return message;
    }

    @SendTo("/topic/all")
    public Map<String, String> sendTo(@Payload Map<String, String> message) {
        return message;
    }
}
