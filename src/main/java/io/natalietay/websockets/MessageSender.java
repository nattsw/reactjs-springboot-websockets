package io.natalietay.websockets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import java.util.Map;

@Component
public class MessageSender {
    @Autowired
    private SimpMessagingTemplate template;

    @Scheduled(fixedRate = 2000)
    public void sendMessage() {
        Map<String, String> message2  = new HashMap<String, String>() {{
            put("message", "helwwwwwlo");
        }};

        this.template.convertAndSend("/topic/all", message2);
    }
}
