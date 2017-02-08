package com.sunyard.util;

//JAVA开发包
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.xerces.parsers.DOMParser;
import org.apache.xml.serialize.OutputFormat;
import org.apache.xml.serialize.XMLSerializer;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Entity;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

/**
 * <p>
 * Title: 提供XML DOM操作的公共静态方法
 * </p>
 * <p>
 * Description: 基于APACHE XERCES开发包
 * </p>
 * <p>
 * Copyright: Copyright (c) 2001
 * </p>
 * <p>
 * Company:
 * </p>
 * 
 * @author
 * @version 1.0
 */
public class DOMEngine {
	private static final Logger logger = LogManager.getLogger();

	/**
	 * 创建一个文档（Document）
	 * 
	 * @return Document
	 */
	public static Document createDocument() {
		Document commonRoot = null;
		try {
			commonRoot = (Document) Class.forName("org.apache.xerces.dom.DocumentImpl").newInstance();
		} catch (Exception e) {
			logger.error(e, e);
		}
		return commonRoot;
	}

	/**
	 * 在节点（Node）下创建一个元素（Element）
	 * 
	 * @param node
	 *            当前节点
	 * @param elemName
	 *            元素名
	 * @param elemValue
	 *            元素值
	 * @return Element
	 */
	public static Element createElement(Node node, String elemName, String elemValue) {
		Document doc = node.getOwnerDocument();
		Element elem = doc.createElement(elemName);
		Node textnode = doc.createTextNode(elemName);
		textnode.setNodeValue(elemValue);
		elem.appendChild(textnode);
		node.appendChild(elem);
		return elem;
	}

	/**
	 * 在节点（Node）下创建一个空元素（Element）
	 * 
	 * @param node
	 *            当前节点
	 * @param elemName
	 *            元素名
	 * @return Element
	 */
	public static Element createElement(Node node, String elemName) {
		Document doc = node.getOwnerDocument();
		Element elem = doc.createElement(elemName);
		node.appendChild(elem);
		return elem;
	}

	/**
	 * 在文档（Document）下创建一个空的根元素（Element）
	 * 
	 * @param doc
	 *            文档入口
	 * @param rootName
	 *            根元素名
	 * @return Element
	 */
	public static Element createRootElement(Document doc, String rootName) {
		Element elem = doc.createElement(rootName);
		doc.appendChild(elem);
		return elem;
	}

	/**
	 * 通过父节点取得元素值
	 * 
	 * @param parent
	 *            父节点
	 * @param tagname
	 *            元素名称
	 * @return 元素值
	 */
	public static String getTextByTagName(Element parent, String tagname) {
		try {
			NodeList list = parent.getElementsByTagName(tagname);
			if (list == null) {
				return null;
			}
			Element element = (Element) list.item(0);
			Node textnode = element.getFirstChild();
			return textnode.getNodeValue();
		} catch (Exception e) {
			return "";
		}
	}

	/**
	 * 在文档（Document）下创建一个根元素（Element）
	 * 
	 * @param doc
	 *            文档入口
	 * @param rootName
	 *            根元素名
	 * @param rootValue
	 *            根元素值
	 * @return Element
	 */
	public static Element createRootElement(Document doc, String rootName, String rootValue) {
		Element elem = doc.createElement(rootName);
		Node textnode = doc.createTextNode(rootName);
		textnode.setNodeValue(rootValue);
		elem.appendChild(textnode);
		doc.appendChild(elem);
		return elem;
	}

	/**
	 * 在某元素（Element）下创建一个属性（Attribute）
	 * 
	 * @param elem
	 *            元素
	 * @param attrName
	 *            属性名
	 * @param attrValue
	 *            属性值
	 */
	public static void createAttribute(Element elem, String attrName, String attrValue) {
		Document doc = elem.getOwnerDocument();
		Attr attr = doc.createAttribute(attrName);
		attr.setNodeValue(attrValue);
		elem.setAttribute(attr.getNodeName(), attr.getNodeValue());
	}

	/**
	 * 将XML文件解析成DOM对象
	 * 
	 * @param sDocName
	 *            xml文件的绝对路径
	 * @return Document
	 */
	public static Document parseDoc(String sDocName) {
		Document theDocument = null;
		DOMParser parser = new DOMParser();
		try {
			parser.setFeature("http://xml.org/sax/features/validation", false);
			parser.parse(sDocName.trim());
		} catch (SAXException se) {
			logger.error(se, se);
		} catch (IOException ioe) {
			logger.error(ioe, ioe);
		}
		theDocument = parser.getDocument();
		return theDocument;
	}

	/**
	 * 将XML输出到文件
	 * 
	 * @param doc
	 *            DOM对象
	 * @param fileName
	 *            xml文件的绝对路径
	 */
	public static void dispDoc(Document doc, String fileName) {
		PrintWriter xmlout = null;
		XMLSerializer xl = null;
		try {
			xmlout = new PrintWriter(new FileWriter(fileName));
			xl = new XMLSerializer(xmlout, new OutputFormat(doc, "UTF-8", true));
			xl.serialize(doc);
			// XMLSerializer xl1= new XMLSerializer(System.out, new
			// OutputFormat(doc,"GBK",true));
			// xl1.serialize(doc);
		} catch (Exception e) {
		} finally {
			if (xmlout != null) {
				xmlout.close();
			}
		}
	}

	/**
	 * 将XML输出到标准输出，用于调试
	 * 
	 * @param doc
	 *            DOM对象
	 */
	public static void dispDoc(Document doc) {
		try {
			XMLSerializer xl1 = new XMLSerializer(System.out, new OutputFormat(doc, "GBK", true));
			xl1.serialize(doc);
		} catch (Exception e) {
			logger.error(e, e);
		}
	}

	/**
	 * 提取Node节点下第一个标签为tagName的子孙节点的元素值
	 * 
	 * @param node
	 *            当前节点
	 * @param name
	 *            要查找元素的标签名
	 * @return String 元素值
	 */
	public static String getTextFromNodeChild(Node node, String name) { // 1+
		String retStr = null;
		if (node != null) { // 2+
			NodeList nodeList = node.getChildNodes();
			if (nodeList != null) { // 3+
				for (int i = 0; i < nodeList.getLength(); i++) { // 4+
					Node childNode = nodeList.item(i);
					if (childNode.getNodeName().equals(name)) { // 5+
						retStr = getTextFromNode(childNode);
						return retStr;
					} // 5-
					else {
						retStr = getTextFromNodeChild(childNode, name);
					}
				} // 4-
			} // 3-
		} // 2-
		return retStr;
	} // 1-

	/**
	 * 提取当前节点（node）的元素值，并考虑到Entity引用情况
	 * 
	 * @param node
	 *            当前节点
	 * @return String 元素值
	 */
	public static String getTextFromNode(Node node) { // 1+
		StringBuffer returnStr = new StringBuffer();
		NodeList nodeList = node.getChildNodes();
		if (nodeList != null) { // 2+
			for (int i = 0; i < nodeList.getLength(); i++) { // 3+
				Node childNode = nodeList.item(i);
				switch (childNode.getNodeType()) { // 4+
				case Node.TEXT_NODE:
					returnStr.append(childNode.getNodeValue());
					break;
				case Node.ENTITY_NODE:
					returnStr.append(getTextFromEntity((Entity) childNode));
					break;
				} // 4-
			} // 3-
		} // 2-
		else { // 2+
			returnStr.setLength(0);
		} // 2-
		return returnStr.toString().trim();
	} // 1-

	/**
	 * 提取Entity中的元素值
	 * 
	 * @param entity
	 *            当前实体
	 * @return String 元素值
	 */
	public static String getTextFromEntity(Entity entity) { // 1+
		StringBuffer returnStr = new StringBuffer();
		if (entity.getNodeType() == Node.ENTITY_NODE) { // 2+
			NodeList entityList = entity.getChildNodes();
			if (entityList != null) { // 3+
				for (int i = 0; i < entityList.getLength(); i++) { // 4+
					Node childNode = entityList.item(i);
					switch (childNode.getNodeType()) { // 5+
					case Node.TEXT_NODE:
						returnStr.append(childNode.getNodeValue());
						break;
					case Node.ENTITY_NODE:
						returnStr.append(getTextFromEntity((Entity) childNode));
						break;
					} // 5-
				} // 4-
			} // 3-
			else {
				returnStr.setLength(0);
			}
		} // 2-
		return returnStr.toString().trim();
	} // 1-

	/**
	 * 取得root下标签为name，元素值为value的节点
	 * 
	 * @param root
	 *            根节点
	 * @param name
	 *            标签名
	 * @param value
	 *            元素值
	 * @return Node
	 */
	public static Node getNodeByValue(Node root, String name, String value) {
		Node rtNode = null;
		// root.getOwnerDocument().getDocumentElement().normalize();
		String tmp = DOMEngine.getTextFromNodeChild(root, name);
		if (tmp != null && tmp.equals(value)) {
			return root;
		}
		if (root.hasChildNodes()) {
			rtNode = getNodeByValue(root.getFirstChild(), name, value);
			if (rtNode != null) {
				return rtNode;
			}
		}
		if (root.getNextSibling() != null) {
			rtNode = getNodeByValue(root.getNextSibling(), name, value);
			if (rtNode != null) {
				return rtNode;
			}
		}
		return null;
	}

	/**
	 * 从DOCUMENT中取得标签为tagname的所有节点
	 * 
	 * @param doc
	 *            文档对象
	 * @param tagname
	 *            标签名称
	 * @return NodeList
	 */
	public static NodeList getNodesByTagname(Document doc, String tagname) {
		return doc.getElementsByTagName(tagname);
	}

	/**
	 * 从DOCUMENT中取得标签为tagname的节点数目
	 * 
	 * @param doc
	 *            文档对象
	 * @param tagname
	 *            标签名称
	 * @return int 节点数目
	 */
	public static int getAmountByTagname(Document doc, String tagname) {
		return doc.getElementsByTagName(tagname).getLength();
	}

	/**
	 * 从DOCUMENT中取得标签为tagname的第N个节点
	 * 
	 * @param doc
	 *            文档对象
	 * @param tagname
	 *            标签名称
	 * @param number
	 *            顺序号
	 * @return Node
	 */
	public static Node getNodeByTagname(Document doc, String tagname, int number) {
		NodeList nl = doc.getElementsByTagName(tagname);
		if (nl.getLength() >= number && number > 0) {
			return nl.item(--number);
		} else {
			return null;
		}
	}

	/**
	 * 从DOCUMENT中取得标签为tagname的第一个节点
	 * 
	 * @param doc
	 *            文档对象
	 * @param tagname
	 *            标签名称
	 * @return Node
	 */
	public static Node getFirstNodeByTagname(Document doc, String tagname) {
		NodeList nl = doc.getElementsByTagName(tagname);
		if (nl.getLength() > 0) {
			return nl.item(0);
		} else {
			return null;
		}
	}

	/**
	 * 从DOCUMENT中取得标签为tagname的最后一个节点
	 * 
	 * @param doc
	 *            文档对象
	 * @param tagname
	 *            标签名称
	 * @return Node
	 */
	public static Node getLastNodeByTagname(Document doc, String tagname) {
		NodeList nl = doc.getElementsByTagName(tagname);
		int iIndex = 0;
		if ((iIndex = nl.getLength()) > 0) {
			return nl.item(--iIndex);
		} else {
			return null;
		}
	}

	/**
	 * 从ELEMENT中取得标签为tagname的第一个节点
	 * 
	 * @param elem
	 * @param tagname
	 * @return Node
	 */
	public static Node getFirstNodeByTagname(Element elem, String tagname) {
		NodeList nl = elem.getElementsByTagName(tagname);
		int iIndex = 0;
		if ((iIndex = nl.getLength()) > 0) {
			return nl.item(--iIndex);
		} else {
			return null;
		}
	}

	/**
	 * 取得节点的指定属性值，当且仅当该节点是一个元素
	 * 
	 * @param node
	 * @param attributeName
	 * @return String
	 */
	public static String getAttributeValue(Node node, String attributeName) {
		if (node != null && node.getNodeType() == Node.ELEMENT_NODE) {
			Element elem = (Element) node;
			return elem.getAttribute(attributeName);
		} else {
			return null;
		}
	}

	/**
	 * 将xml转换成字符串
	 * 
	 * @param doc
	 * @return
	 */
	public static String XML2String(Document doc) {
		StringWriter sw = new StringWriter();
		try {
			// XMLSerializer xl= new XMLSerializer(sw,new
			// OutputFormat(doc,"UTF-8",true));
			XMLSerializer xl = new XMLSerializer(sw, new OutputFormat(doc, "GBK", true));
			xl.serialize(doc);
		} catch (Exception e) {
			logger.error(e, e);
		}
		return sw.toString();
	}

	/**
	 * 将字符串解析成DOM对象
	 * 
	 * @param str
	 * @return DOM对象
	 */
	public static Document strToXML(String s) throws Exception {
		s = s.trim();
		Document theDocument = null;
		StringReader sr = new StringReader(s);
		DOMParser parser = new DOMParser();
		try {
			InputSource is = new InputSource(sr);
			parser.parse(is);
		} catch (SAXException se) {
			logger.error(se, se);
		} catch (IOException ioe) {
			logger.error(ioe, ioe);
		}
		theDocument = parser.getDocument();
		return theDocument;
	}

}