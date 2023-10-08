package gamesoldstoreprojkt.service;

import java.awt.Color;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;


import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import gamesoldstoreprojkt.Model.Client;
import gamesoldstoreprojkt.Model.Employee;
import gamesoldstoreprojkt.Model.GameProduct;
import gamesoldstoreprojkt.Model.Order;

public class DatabasePDFService<T> {
 
    public static ByteArrayInputStream usersPDFReport(List<Employee> employees, List<Client> clients) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
 
        try {
 
            PdfWriter.getInstance(document, out);
            document.open();
 
            // Add Content to PDF file ->
            Font fontHeader = FontFactory.getFont(FontFactory.TIMES_BOLD, 22);
            Font fontTimeAndDate = FontFactory.getFont(FontFactory.TIMES_BOLD, 18);
            Date currentDate = new Date();
            Paragraph reportTitle = new Paragraph("Relatório de Empregado", fontHeader);
            Paragraph reportDateAndTime = new Paragraph("Hora e Data = " + currentDate.toString(), fontTimeAndDate);
            reportDateAndTime.setAlignment(Element.ALIGN_CENTER);
            reportTitle.setAlignment(Element.ALIGN_CENTER);
            document.add(reportTitle);
            document.add(reportDateAndTime);
            document.add(Chunk.NEWLINE);
 
            PdfPTable table = new PdfPTable(7);
            // Add PDF Table Header ->
            Stream.of("ID", "Nome", "N° Casa", "Rua", "N° da Rua", "Cargo", "Salario").forEach(headerTitle -> {
                PdfPCell header = new PdfPCell();
                Font headFont = FontFactory.getFont(FontFactory.TIMES_BOLD);
                header.setBackgroundColor(Color.CYAN);
                header.setHorizontalAlignment(Element.ALIGN_CENTER);
                header.setBorderWidth(2);
                header.setPhrase(new Phrase(headerTitle, headFont));
                table.addCell(header);
            });
 
            for (Employee employee : employees) {
                PdfPCell idCell = new PdfPCell(new Phrase(employee.getIdentificationNumber().toString()));
                idCell.setPaddingLeft(4);
                idCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                idCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(idCell);
 
                PdfPCell nameCell = new PdfPCell(new Phrase(employee.getName()));
                nameCell.setPaddingLeft(4);
                nameCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                nameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(nameCell);
 
                PdfPCell houseNumberCell = new PdfPCell(new Phrase(String.valueOf(employee.getHouseNumber())));
                houseNumberCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                houseNumberCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                houseNumberCell.setPaddingRight(4);
                table.addCell(houseNumberCell);
 
                PdfPCell streetNameCell = new PdfPCell(new Phrase(String.valueOf(employee.getStreetName())));
                streetNameCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                streetNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                streetNameCell.setPaddingRight(4);
                table.addCell(streetNameCell);
 
                PdfPCell streetNumberCell = new PdfPCell(new Phrase(String.valueOf(employee.getStreetNumber())));
                streetNumberCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                streetNumberCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                streetNumberCell.setPaddingRight(4);
                table.addCell(streetNumberCell);

                PdfPCell jobRoleCell = new PdfPCell(new Phrase(String.valueOf(employee.getJobRole())));
                jobRoleCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                jobRoleCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                jobRoleCell.setPaddingRight(4);
                table.addCell(jobRoleCell);

                PdfPCell salaryCell = new PdfPCell(new Phrase(String.valueOf(employee.getSalary())));
                salaryCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                salaryCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                salaryCell.setPaddingRight(4);
                table.addCell(salaryCell);
            }
            document.add(table);


            // Add Content to PDF file ->
            fontHeader = FontFactory.getFont(FontFactory.TIMES_BOLD, 22);
            fontTimeAndDate = FontFactory.getFont(FontFactory.TIMES_BOLD, 18);
            currentDate = new Date();
            reportTitle = new Paragraph("Relatório de Clientes", fontHeader);
            reportDateAndTime = new Paragraph("Hora e Data = " + currentDate.toString(), fontTimeAndDate);
            reportDateAndTime.setAlignment(Element.ALIGN_CENTER);
            reportTitle.setAlignment(Element.ALIGN_CENTER);
            document.add(reportTitle);
            document.add(reportDateAndTime);
            document.add(Chunk.NEWLINE);
 
            PdfPTable newTable = new PdfPTable(7);
            // Add PDF Table Header ->
            Stream.of("ID", "Nome", "N°", "Rua", "N° da Rua", "Método Pagamento", "Dívida").forEach(headerTitle -> {
                PdfPCell header = new PdfPCell();
                Font headFont = FontFactory.getFont(FontFactory.TIMES_BOLD);
                header.setBackgroundColor(Color.CYAN);
                header.setHorizontalAlignment(Element.ALIGN_CENTER);
                header.setBorderWidth(2);
                header.setPhrase(new Phrase(headerTitle, headFont));
                newTable.addCell(header);
            });
 
            for (Client client : clients) {
                PdfPCell idCell = new PdfPCell(new Phrase(client.getIdentificationNumber().toString()));
                idCell.setPaddingLeft(4);
                idCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                idCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                newTable.addCell(idCell);
 
                PdfPCell nameCell = new PdfPCell(new Phrase(client.getName()));
                nameCell.setPaddingLeft(4);
                nameCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                nameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                newTable.addCell(nameCell);
 
                PdfPCell houseNumberCell = new PdfPCell(new Phrase(String.valueOf(client.getHouseNumber())));
                houseNumberCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                houseNumberCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                houseNumberCell.setPaddingRight(4);
                newTable.addCell(houseNumberCell);
 
                PdfPCell streetNameCell = new PdfPCell(new Phrase(String.valueOf(client.getStreetName())));
                streetNameCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                streetNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                streetNameCell.setPaddingRight(4);
                newTable.addCell(streetNameCell);
 
                PdfPCell streetNumberCell = new PdfPCell(new Phrase(String.valueOf(client.getStreetNumber())));
                streetNumberCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                streetNumberCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                streetNumberCell.setPaddingRight(4);
                newTable.addCell(streetNumberCell);

                PdfPCell paymentMethodCell = new PdfPCell(new Phrase(String.valueOf(client.getPreferredPaymentMethod())));
                paymentMethodCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                paymentMethodCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                paymentMethodCell.setPaddingRight(4);
                newTable.addCell(paymentMethodCell);

                PdfPCell debtCell = new PdfPCell(new Phrase(String.valueOf(client.getClientDebt())));
                debtCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                debtCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                debtCell.setPaddingRight(4);
                newTable.addCell(debtCell);
            }
            document.add(newTable);

            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
 
        return new ByteArrayInputStream(out.toByteArray());
    }
    public static ByteArrayInputStream gamesPDFReport(List<GameProduct> games) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
 
        try {
 
            PdfWriter.getInstance(document, out);
            document.open();
 
            // Add Content to PDF file ->
           Font fontHeader = FontFactory.getFont(FontFactory.TIMES_BOLD, 22);
            Font fontTimeAndDate = FontFactory.getFont(FontFactory.TIMES_BOLD, 18);
            Date currentDate = new Date();
            Paragraph reportTitle = new Paragraph("Relatório de Jogos", fontHeader);
            Paragraph reportDateAndTime = new Paragraph("Hora e Data = " + currentDate.toString(), fontTimeAndDate);
            reportDateAndTime.setAlignment(Element.ALIGN_CENTER);
            reportTitle.setAlignment(Element.ALIGN_CENTER);
            document.add(reportTitle);
            document.add(reportDateAndTime);
            document.add(Chunk.NEWLINE);
 
            PdfPTable table = new PdfPTable(4);
            // Add PDF Table Header ->
            Stream.of("ID", "Nome", "Preço", "Categorias").forEach(headerTitle -> {
                PdfPCell header = new PdfPCell();
                Font headFont = FontFactory.getFont(FontFactory.TIMES_BOLD);
                header.setBackgroundColor(Color.CYAN);
                header.setHorizontalAlignment(Element.ALIGN_CENTER);
                header.setBorderWidth(2);
                header.setPhrase(new Phrase(headerTitle, headFont));
                table.addCell(header);
            });
 
            for (GameProduct game : games) {
                PdfPCell idCell = new PdfPCell(new Phrase(game.getProductId().toString()));
                idCell.setPaddingLeft(4);
                idCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                idCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(idCell);
 
                PdfPCell nameCell = new PdfPCell(new Phrase(game.getProductName()));
                nameCell.setPaddingLeft(4);
                nameCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                nameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(nameCell);
 
                PdfPCell productPriceCell = new PdfPCell(new Phrase(String.valueOf(game.getProductPrice())));
                productPriceCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                productPriceCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                productPriceCell.setPaddingRight(4);
                table.addCell(productPriceCell);
 
                PdfPCell productTagsCell = new PdfPCell(new Phrase(returnStringIfArrayNotNull(game.getProductTags())));
                productTagsCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                productTagsCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                productTagsCell.setPaddingRight(4);
                table.addCell(productTagsCell);
            }
            document.add(table);
 
            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
 
        return new ByteArrayInputStream(out.toByteArray());
    }

    public static ByteArrayInputStream salesPDFReport(List<Order> sales) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
 
        try {
 
            PdfWriter.getInstance(document, out);
            document.open();
 
            // Add Content to PDF file ->
           Font fontHeader = FontFactory.getFont(FontFactory.TIMES_BOLD, 22);
            Font fontTimeAndDate = FontFactory.getFont(FontFactory.TIMES_BOLD, 18);
            Date currentDate = new Date();
            Paragraph reportTitle = new Paragraph("Sales Report", fontHeader);
            Paragraph reportDateAndTime = new Paragraph("Date and  Time = " + currentDate.toString(), fontTimeAndDate);
            reportDateAndTime.setAlignment(Element.ALIGN_CENTER);
            reportTitle.setAlignment(Element.ALIGN_CENTER);
            document.add(reportTitle);
            document.add(reportDateAndTime);
            document.add(Chunk.NEWLINE);
 
            PdfPTable table = new PdfPTable(5);
            // Add PDF Table Header ->
            Stream.of("ID", "Order Status", "Price", "Products", "Buyer").forEach(headerTitle -> {
                PdfPCell header = new PdfPCell();
                Font headFont = FontFactory.getFont(FontFactory.TIMES_BOLD);
                header.setBackgroundColor(Color.CYAN);
                header.setHorizontalAlignment(Element.ALIGN_CENTER);
                header.setBorderWidth(2);
                header.setPhrase(new Phrase(headerTitle, headFont));
                table.addCell(header);
            });
 
            for (Order order : sales) {
                PdfPCell idCell = new PdfPCell(new Phrase(order.getOrderId().toString()));
                idCell.setPaddingLeft(4);
                idCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                idCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(idCell);

                PdfPCell orderStatusCell = new PdfPCell(new Phrase(returnPayedIfTrueElseReturnNotPayed(order.getOrderIsPayed())));
                orderStatusCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                orderStatusCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                orderStatusCell.setPaddingRight(4);
                table.addCell(orderStatusCell);
 
                PdfPCell priceCell = new PdfPCell(new Phrase(String.valueOf(order.getOrderPrice())));
                priceCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                priceCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                priceCell.setPaddingRight(4);
                table.addCell(priceCell);
 
                PdfPCell productsCell = new PdfPCell(new Phrase(returnStringIfArrayNotNull(order.getProducts())));
                productsCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                productsCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                productsCell.setPaddingRight(4);
                table.addCell(productsCell);

                PdfPCell buyerCell = new PdfPCell(new Phrase(order.getClientBuyer().getName()));
                buyerCell.setPaddingLeft(4);
                buyerCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                buyerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(buyerCell);
            }
            document.add(table);
 
            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
 
        return new ByteArrayInputStream(out.toByteArray());
    }

    public static String  returnStringIfArrayNotNull(String [] tags){ 
        if(tags == null) return "No tags found";

        return Arrays.toString(tags);
    }

    public static String returnStringIfArrayNotNull(GameProduct [] products){
        if(products == null) return "No products found";

        final String [] arrayGameNames = new String[products.length]; 
        for(int i = 0; i < products.length; i++) {
            arrayGameNames[i] = products[i].getProductName();
        }

        return Arrays.toString(arrayGameNames);
    }

    public static String returnPayedIfTrueElseReturnNotPayed(boolean orderStatus){
        if(orderStatus) return "Payed";

        return "Awaiting Payment";
    }


}