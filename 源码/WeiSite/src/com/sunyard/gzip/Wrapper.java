/**************************************************************************
 * Copyright (c) 2013-2015 信雅达信息系统工程有限公司.
 * All rights reserved.
 * 
 * 项目名称：微客平台2.0项目
 * 版权说明：本软件属信雅达信息系统工程有限公司所有。                            
 ***************************************************************************/
package com.sunyard.gzip;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

/**
 * @ClassName: Wrapper
 * @Description:
 * @author 王兴钢 xingg.wang@sunyard.com
 * @date 2016年1月29日 上午9:19:49
 * 
 */
public class Wrapper extends HttpServletResponseWrapper {
	public static final int OT_NONE = 0, OT_WRITER = 1, OT_STREAM = 2;
	private int outputType = OT_NONE;
	private ServletOutputStream output = null;
	private PrintWriter writer = null;
	private ByteArrayOutputStream buffer = null;

	public Wrapper(HttpServletResponse resp) throws IOException {
		super(resp);
		buffer = new ByteArrayOutputStream();
	}

	public PrintWriter getWriter() throws IOException {
		if (outputType == OT_STREAM)
			throw new IllegalStateException();
		else if (outputType == OT_WRITER)
			return writer;
		else {
			outputType = OT_WRITER;
			writer = new PrintWriter(new OutputStreamWriter(buffer,
					getCharacterEncoding()));
			return writer;
		}
	}

	public ServletOutputStream getOutputStream() throws IOException {
		if (outputType == OT_WRITER)
			throw new IllegalStateException();
		else if (outputType == OT_STREAM)
			return output;
		else {
			outputType = OT_STREAM;
			output = new WrappedOutputStream(buffer);
			return output;
		}
	}

	public void flushBuffer() throws IOException {
		if (outputType == OT_WRITER)
			writer.flush();
		if (outputType == OT_STREAM)
			output.flush();
	}

	public void reset() {
		outputType = OT_NONE;
		buffer.reset();
	}

	public byte[] getResponseData() throws IOException {
		flushBuffer();
		return buffer.toByteArray();

	}

	class WrappedOutputStream extends ServletOutputStream {
		private ByteArrayOutputStream buffer;

		public WrappedOutputStream(ByteArrayOutputStream buffer) {
			this.buffer = buffer;
		}

		public void write(int b) throws IOException {
			buffer.write(b);
		}

		public byte[] toByteArray() {
			return buffer.toByteArray();
		}
	}
}
