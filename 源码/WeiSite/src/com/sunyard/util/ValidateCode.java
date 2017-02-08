package com.sunyard.util;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageTypeSpecifier;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.event.IIOWriteProgressListener;
import javax.imageio.metadata.IIOMetadata;
import javax.imageio.stream.ImageOutputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 验证码生成器
 */
public class ValidateCode {
	private HttpServletRequest request;
	private HttpServletResponse response;
	private HttpSession session;

	private String strSpan = "0123456789"; // 生成验证码的字符集
	private String key = "sunyard-zxbank"; // 映射密钥

	private int strLen = 4;// 长度

	private int fontSize = 30; // 验证码字符大小

	private int imgWidth = 70; // 验证码图片宽度

	private int imgHeight = 39; // 验证码图片高度

	private String fontName = "HelveticaNeueL"; // 验证码字符字体名称

	private boolean hasFrame = true; // 验证码图片是否显示边框

	private boolean hasBackground = false;// 验证码图片是否显示背景Jaiva标志

	private String sessionKey = "yzm"; // session中存放验证码的变量名称
	private String code = "ValidateCode"; //

	// 选转标志，验证码旋转
	private boolean ROTATE_FLAG = true;

	// 构造函数
	public ValidateCode(HttpServletRequest request, HttpServletResponse response) {
		this.request = request;
		this.response = response;
		if (request != null) {
			this.session = request.getSession();
		}
	}

	// 主方法,生成验证码
	public boolean generate() throws Exception {

		boolean flag = false;

		String outStr = this.getRanStr(this.strSpan, this.strLen);
		Font font = new Font(this.fontName, Font.PLAIN, this.fontSize);
		BufferedImage image = new BufferedImage(this.imgWidth, this.imgHeight,
				BufferedImage.TYPE_INT_RGB);
		Graphics2D g = (Graphics2D) image.getGraphics();
		// 设置随机颜色
		g.setColor(Color.white);
		g.fillRect(0, 0, this.imgWidth, this.imgHeight);

		// 设置干扰点 干扰线
 
		for (int i = 0; i < 25; i++) {
			g.setColor(new Color(DataUtil.getRandomInt(255, true), DataUtil
					.getRandomInt(255, true), DataUtil.getRandomInt(255, true)));
			g.drawLine(DataUtil.getRandomInt(imgWidth, true),
					DataUtil.getRandomInt(imgHeight, true),
					DataUtil.getRandomInt(imgWidth, true),
					DataUtil.getRandomInt(imgHeight, true));
		}

		// 设定字体
		g.setFont(new Font(this.fontName, Font.PLAIN, 26));// "Times New Roman"
		g.setColor(Color.black);// 黑色文字

		/* end */
		if (this.hasFrame)// 有边框
		{
			g.setColor(Color.black);
			g.drawRect(0, 0, this.imgWidth - 1, this.imgHeight - 1);
		}

		for (int i = 0; i < outStr.length(); i++) {
			// 要打印的字符
			String chi = Character.toString(outStr.charAt(i));
			// 字符所在区域宽度
			int chAreaWidth = this.imgWidth / this.strLen - 1;
			// 字符打印位置横坐标
			int posX = i * chAreaWidth + chAreaWidth / 2
					- g.getFontMetrics(font).stringWidth(chi) / 4;
			// 字符打印位置纵坐标
			int posY = this.imgHeight / 2 + g.getFontMetrics(font).getHeight()
					/ 4;
			/*
			 * double d=random.nextDouble(); double scaleX = (d>0.5?d-0.5:d) +
			 * 0.7; //字符横向放大比例
			 */
			double scaleX = 1.0;
			/*
			 * d=random.nextDouble(); double scaleY = (d>0.5?d-0.5:d) + 0.7;
			 * //字符纵向放大比例
			 */
			double scaleY = 1.0;
			// double rotateAngle = (0.6 - random.nextDouble()) * Math.PI / 2.0;
			// // 字符顺时针旋转角度
			// 字符顺时针旋转角度
			// double rotateAngle = (0.6 - DataUtil.getRandom().nextDouble()) *
			// Math.PI / 2.0;
			// double rotateAngle = 0.5; //字符顺时针旋转角度

			AffineTransform atf = new AffineTransform();
			atf.translate(posX * (1.0 - scaleX), posY * (1.0 - scaleY));
			atf.scale(scaleX, scaleY);
			// atf.rotate(rotateAngle, posX, posY);
			g.setTransform(atf);
			g.drawString(chi, posX, posY);
		}

		g.dispose();

		if (this.response != null) {
			this.response.setContentType("image/png");
			this.response.setHeader("Pragma", "No-cache");
			this.response.setHeader("Cache-Control", "no-cache");
			this.response.setDateHeader("Expires", 0);
			// 得到输出字节流
			ServletOutputStream out = this.response.getOutputStream();
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			ImageOutputStream ios = ImageIO.createImageOutputStream(baos);

			write(ios, null, "png", image, null, 0.75f);
			byte[] jpegData = baos.toByteArray();

			// System.out.println(jpegData.length);
			out.write(jpegData);
			out.flush();
			flag = true;

		}
		return flag;
	}

	/**
	 * 生成指定字符串的图像数据
	 * 
	 * @param verifyCode
	 *            即将被打印的随机字符串
	 * @return 生成的图像数据
	 * @throws NoSuchAlgorithmException
	 */
	@SuppressWarnings("unused")
	private BufferedImage getImage() throws NoSuchAlgorithmException {
		BufferedImage image = new BufferedImage(this.imgWidth, this.imgHeight,
				BufferedImage.TYPE_INT_RGB);

		// 获取图形上下文
		Graphics graphics = image.getGraphics();
		Graphics2D g2 = (Graphics2D) graphics;
		g2.setColor(this.getRandColor(100, 255));
		g2.fillRect(0, 0, this.imgWidth, this.imgHeight);
		// 边框
		g2.drawRect(0, 0, this.imgWidth, this.imgHeight);

		// 5条干扰线
		for (int i = 0; i < 25; i++) {
			g2.setColor(new Color(DataUtil.getRandomInt(255, true), DataUtil
					.getRandomInt(255, true), DataUtil.getRandomInt(255, true)));
			g2.drawLine(DataUtil.getRandomInt(imgWidth, true),
					DataUtil.getRandomInt(imgHeight, true),
					DataUtil.getRandomInt(imgWidth, true),
					DataUtil.getRandomInt(imgHeight, true));
		}

		int fontsize;
		int fontstyle = 0;
		double oldrot = 0;
		String outStr = this.getRanStr(this.strSpan, this.strLen);

		for (int i = 0; i < outStr.length(); i++) {
			fontsize = Math.abs(DataUtil.getRandomInt(24, true));
			// 18-24 fontsize
			if (fontsize < 12) {
				fontsize += 12;
			}
			if (fontsize < 18) {
				fontsize += 6;
			}
			fontstyle = DataUtil.getRandomInt(6, true);
			// g2.setFont(new Font(fontName, Font.BOLD, 19));//
			// "Times New Roman"
			g2.setFont(new Font(this.fontName, Font.PLAIN, 20));
			double rot = -0.25
					+ Math.abs(Math.toRadians(DataUtil.getRandomInt(25, true)));

			// 如果设置选装标志，则旋转文字
			if (this.ROTATE_FLAG) {
				g2.rotate(-oldrot, 15, 20);
				oldrot = rot;
				g2.rotate(rot, 20 * i + 10, 20);
			}

			float stroke = Math.abs(DataUtil.getRandom().nextFloat() % 30);
			g2.setStroke(new BasicStroke(stroke));
			String temp = outStr.substring(i, i + 1);
			g2.setColor(new Color(DataUtil.getRandomInt(255, true), DataUtil
					.getRandomInt(255, true), DataUtil.getRandomInt(255, true)));
			g2.setColor(Color.black);
			g2.drawString(temp, 23 * i + 18, 23);
		}
		// 图像生效
		g2.dispose();
		return image;
	}

	// 从字符集中取得指定长度的随机字符串
	@SuppressWarnings("unchecked")
	private String getRanStr(String str, int length) {

		String id = "";
		Map<String, String> map = new HashMap<String, String>();

		char[] strTemp = str.toCharArray();
		int size = str.length();
		String getStr = "";
		// Random random = new Random();
		try {
			for (int i = 0; i < length; i++) {
				int num = (int) (DataUtil.getRandom().nextDouble() * size);
				getStr = getStr + strTemp[num];
			}
		} catch (Exception e) {

		}
		str = str.replace(getStr, "");

		if (this.session != null) {
			this.session.setAttribute(this.code, getStr);
		}
		return getStr;
	}

	public String getFontName() {
		return this.fontName;
	}

	public void setFontName(String fontName) {
		this.fontName = fontName;
	}

	public int getFontSize() {
		return this.fontSize;
	}

	public void setFontSize(int fontSize) {
		this.fontSize = fontSize;
	}

	public boolean hasFrame() {
		return this.hasFrame;
	}

	public void setFrame(boolean hasFrame) {
		this.hasFrame = hasFrame;
	}

	public boolean hasBackground() {
		return this.hasBackground;
	}

	public void setBackground(boolean hasBackground) {
		this.hasBackground = hasBackground;
	}

	public int getImgHeight() {
		return this.imgHeight;
	}

	public void setImgHeight(int imgHeight) {
		this.imgHeight = imgHeight;
	}

	public int getImgWidth() {
		return this.imgWidth;
	}

	public void setImgWidth(int imgWidth) {
		this.imgWidth = imgWidth;
	}

	public String getStrSpan() {
		return this.strSpan;
	}

	public void setStrSpan(String strSpan) {
		this.strSpan = strSpan;
	}

	public String getSessionKey() {
		return this.sessionKey;
	}

	public void setSessionKey(String sessionKey) {
		this.sessionKey = sessionKey;
	}

	public Color getRandColor(int fc, int bc) {// 给定范围获得随机颜色
		int r = 0;
		int g = 0;
		int b = 0;
		if (fc > 255) {
			fc = 255;
		}
		if (bc > 255) {
			bc = 255;
		}
		r = fc + DataUtil.getRandomInt(bc - fc, true);
		g = fc + DataUtil.getRandomInt(bc - fc, true);
		b = fc + DataUtil.getRandomInt(bc - fc, true);
		return new Color(r, g, b);
	}

	/**
	 * 编码输出图像。 向图像文件中添加图像缩略图和设置图像压缩质量需要根据具体图像格式。
	 * 
	 * @param out
	 *            输出流。
	 * @param listener
	 *            编码输出进度监听器。
	 * @param formatName
	 *            包含格式非正式名称的 String，例如"jpg"。
	 * @param image
	 *            图像。
	 * @param thumbnails
	 *            缩略图集。
	 * @param quality
	 *            压缩质量。
	 * @throws java.io.IOException
	 */
	public static void write(ImageOutputStream out,
			IIOWriteProgressListener listener, String formatName,
			BufferedImage image, List<? extends BufferedImage> thumbnails,
			float quality) throws IOException {
		if (out == null) {
			throw new IllegalArgumentException("OutputStream must be non null");
		}

		if (formatName == null) {
			throw new IllegalArgumentException("FormatName must be non null");
		}

		if (image == null) {
			throw new IllegalArgumentException("Image must be non null");
		}

		// 取得合适的 ImageWriter。
		Iterator<ImageWriter> writers = ImageIO
				.getImageWritersByFormatName(formatName);
		if (writers == null || !writers.hasNext()) {
			throw new IllegalStateException(formatName);
		}
		ImageWriter writer = writers.next();

		ImageTypeSpecifier imageType = ImageTypeSpecifier
				.createFromRenderedImage(image);
		IIOMetadata metadata = writer.getDefaultImageMetadata(imageType, null);

		IIOImage iioImage = new IIOImage(image, thumbnails, metadata);
		ImageWriteParam param = writer.getDefaultWriteParam();
		// param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
		// param.setCompressionQuality(0.5f);

		writer.setOutput(out);
		writer.addIIOWriteProgressListener(listener);
		writer.write(null, iioImage, param);
		writer.dispose();
	}

}
