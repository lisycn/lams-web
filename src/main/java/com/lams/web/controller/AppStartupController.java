package com.lams.web.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@RestController
@RequestMapping("/web")
public class AppStartupController {

	@Autowired
	private ObjectMapper objectMapper;

	@Value("${com.lams.user.url}")
	private String userUrl;

	@Value("${com.lams.angular}")
	private String URL;

	private static final Logger logger = LoggerFactory.getLogger(AppStartupController.class);

	@RequestMapping(value = "/ping", method = RequestMethod.GET)
	public String getPing() {
		logger.info("Ping success");
		return "Ping Succeed";
	}

	@RequestMapping(value = "/get_urls", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ObjectNode getUrls() {
		ObjectNode reponse = objectMapper.createObjectNode();
		reponse.put("user", userUrl);
		return reponse;
	}

	@RequestMapping(value = "/successUrl", method = RequestMethod.POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public RedirectView successUrl(@RequestBody String request) {
		logger.info("Ping success" + request);
		Map<String, Object> map = new HashMap<String, Object>();
		StringTokenizer b = new StringTokenizer(request, "&");
		while (b.hasMoreElements()) {
			String a = b.nextToken();
			StringTokenizer c = new StringTokenizer(a, "=");
			System.out.println(a);
			String key;
			String value;
			try {
				key = c.nextToken();
			} catch (Exception e) {
				key = null;
			}
			try {
				value = c.nextToken();
			} catch (Exception e) {
				value = null;
			}
			map.put(key, value);

		}
		if (map.get("status").toString().equals("failure")) {
			return new RedirectView(URL + "?txnId=" + map.get("txnid").toString() + "&result=Failed" + "&app="
					+ map.get("udf1").toString());
		} else {
			return new RedirectView(URL + "?txnId=" + map.get("txnid").toString() + "&result=Success" + "&app="
					+ map.get("udf1").toString());
		}
	}

}
