package com;

import model.Inquiry;
//For REST Service
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
//For JSON
import com.google.gson.*;
//For XML
import org.jsoup.*;
import org.jsoup.parser.*;
import org.jsoup.nodes.Document;
@Path("/ProjectInquiry")

public class InquiryService {
	Inquiry inquiryObj = new Inquiry();
	@GET
	@Path("/")
	@Produces(MediaType.TEXT_HTML)
	public String readInquiry()
	{
	return inquiryObj.readInquiry();
	}

	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.TEXT_PLAIN)
	public String insertInquiry(@FormParam("refno") String refno,
			 @FormParam("uname") String uname,
			 @FormParam("email") String email,
			 @FormParam("pnum") String pnum,
			 @FormParam("des") String des)
			{
			 String output = inquiryObj.insertInquiry(refno, uname, email, pnum, des);
				return output;

			}

	@PUT
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String updateInquiry(String inquiryData)
	{
	//Convert the input string to a JSON object
	 JsonObject inquiryObject = new JsonParser().parse(inquiryData).getAsJsonObject();
	//Read the values from the JSON object
	 String id = inquiryObject.get("id").getAsString();
	 String refno = inquiryObject.get("refno").getAsString();
	 String uname = inquiryObject.get("uname").getAsString();
	 String email = inquiryObject.get("email").getAsString();
	 String pnum = inquiryObject.get("pnum").getAsString();
	 String des = inquiryObject.get("des").getAsString();
	 String output = inquiryObj.updateInquiry(id, refno, uname, email, pnum, des);
	 return output;
	}

	@DELETE
	@Path("/")
	@Consumes(MediaType.APPLICATION_XML)
	@Produces(MediaType.TEXT_PLAIN)
	public String deleteInquiry(String insertData)
	{
	//Convert the input string to an XML document
	 Document doc = Jsoup.parse(insertData, "", Parser.xmlParser());

	//Read the value from the element <inquiryID>
	 String id = doc.select("id").text();
	 String output = inquiryObj.deleteInquiry(id);
	return output;
	}

}
