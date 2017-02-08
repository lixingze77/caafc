package com.sunyard.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSON;
import net.sf.json.JSONObject;
import net.sf.json.xml.XMLSerializer;

import org.apache.commons.io.IOUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jdom.Attribute;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

public class XmlUtil {

	public static Logger log = LogManager.getLogger();
	private final static String xmlName = "client_config.xml";

	/** 配置信息system_config.xml */
	public static JSONObject config = xml2JSON();

	/**
	 * 
	 * json对象转换成xml字符串
	 * 
	 * @param json
	 * @return
	 */
	public static String JSON2xml(JSONObject json) {
		try {
			XMLSerializer xmlSerializer = new XMLSerializer();
			xmlSerializer.setRootName("Root");
			xmlSerializer.setTypeHintsEnabled(false);
			return xmlSerializer.write(json);
		} catch (Exception e) {
			log.error(e, e);
		}

		return "";
	}

	/**
	 * 
	 * json对象转换成xml字符串
	 * 
	 * @param json
	 * @return
	 */
	public static String JSON2xml(JSONObject json, String rootName) {
		try {
			XMLSerializer xmlSerializer = new XMLSerializer();

			if (!DataUtil.isEmpty(rootName)) {
				xmlSerializer.setRootName(rootName);
			}
			xmlSerializer.setTypeHintsEnabled(false);

			return xmlSerializer.write(json);
		} catch (Exception e) {
			log.error(e, e);
		}

		return "";
	}

	/**
	 * xml字符串转换成json对象
	 * 
	 * @return
	 */
	private static JSONObject xml2JSON() {
		String path = XmlUtil.class.getResource("").getPath();
		path = path.substring(0, path.length() - 17) + xmlName;
		try {
			path = java.net.URLDecoder.decode(path, "UTF-8");
		} catch (UnsupportedEncodingException e) {
		}
		JSONObject obj = new JSONObject();

		File file = new File(path);
		String xml;
		InputStream is = null;
		try {
			is = new FileInputStream(file);
			xml = IOUtils.toString(is,"UTF-8");
			XMLSerializer xmlSerializer = new XMLSerializer();
			xmlSerializer.setTypeHintsEnabled(false);
			JSON json = xmlSerializer.read(xml);
			obj = JSONObject.fromObject(json);
		} catch (Exception e) {
			log.error(e, e);
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
				}
			}
		}

		return obj;
	}

	/**
	 * 
	 * xml转化成JsonObject
	 * 
	 * @param xmlStr
	 * @return
	 * @throws JDOMException
	 * @throws IOException
	 */
	public static Map<String, String> xml2Map(String xmlStr) throws JDOMException, IOException {
		Map<String, String> rtnMap = new HashMap<String, String>();
		SAXBuilder builder = new SAXBuilder();
		Document doc = builder.build(new StringReader(xmlStr));
		// 得到根节点
		Element root = doc.getRootElement();
		String rootName = root.getName();
		rtnMap.put("root.name", rootName);
		// 调用递归函数，得到所有最底层元素的名称和值，加入map中
		convert(root, rtnMap, rootName);
		return rtnMap;
	}

	/**
	 * 递归函数，找出最下层的节点并加入到map中，由xml2Map方法调用。
	 * 
	 * @param e
	 *            xml节点，包括根节点
	 * @param map
	 *            目标map
	 * @param lastname
	 *            从根节点到上一级节点名称连接的字串
	 */
	@SuppressWarnings("rawtypes")
	public static void convert(Element e, Map<String, String> map, String lastname) {
		if (e.getAttributes().size() > 0) {
			Iterator it_attr = e.getAttributes().iterator();
			while (it_attr.hasNext()) {
				Attribute attribute = (Attribute) it_attr.next();
				String attrname = attribute.getName();
				String attrvalue = e.getAttributeValue(attrname);
				map.put(lastname + "." + attrname, attrvalue);
			}
		}
		List children = e.getChildren();
		Iterator it = children.iterator();
		while (it.hasNext()) {
			Element child = (Element) it.next();
			String name = lastname + "." + child.getName();
			// 如果有子节点，则递归调用
			if (child.getChildren().size() > 0) {
				convert(child, map, name);
			} else {
				// 如果没有子节点，则把值加入map
				map.put(name, child.getText());
				// 如果该节点有属性，则把所有的属性值也加入map
				if (child.getAttributes().size() > 0) {
					Iterator attr = child.getAttributes().iterator();
					while (attr.hasNext()) {
						Attribute attribute = (Attribute) attr.next();
						String attrname = attribute.getName();
						String attrvalue = child.getAttributeValue(attrname);
						map.put(name + "." + attrname, attrvalue);
					}
				}
			}
		}
	}
	// public static void main(String[] args) {
	// String s =
	// "{\"ACCNO\":\"6226900500595455\",\"MEDIATYPE\":\"WEIXIN\",\"SUBCHANEL\":\"4\",\"OPENID\":\"2088101140230905\",\"CTFTYPE\":\"0\",\"CTFNO\":\"320149195708294819\",\"SMSFLAG\":\"0\",\"PWD\":\"00000\",\"CSTNO\":\"9900001806\",\"MOBILE\":\"13900000000\",\"DYRECNO\":\"1000000000126894\",\"DYCTN\":\"598044\"}";
	// JSONObject o = JSONObject.fromObject(s);
	// String s1 = JSON2xml(o,"steam");
	//
	// }
}
