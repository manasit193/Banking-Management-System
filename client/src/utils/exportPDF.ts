import jsPDF from "jspdf";

type Transaction = {
  _id: string;
  type: string;
  amount: number;
  createdAt: string;
  sender?: {
    fullName: string;
    accountNumber: string;
  };
  receiver?: {
    fullName: string;
    accountNumber: string;
  };
};

export const exportPDF = (
  transactions: Transaction[]
) => {

  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "Nexa Bank Transaction History",
    20,
    20
  );

  doc.setFontSize(11);

  let y = 35;

  transactions.forEach((item, index) => {

    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.text(
      `${index + 1}. ${item.type}`,
      20,
      y
    );

    doc.text(
      `Amount : ₹${item.amount.toLocaleString()}`,
      80,
      y
    );

    doc.text(
      new Date(item.createdAt).toLocaleDateString(
        "en-IN"
      ),
      150,
      y
    );

    y += 10;

  });

  doc.save(
    `Transaction-History-${
      new Date().toISOString().split("T")[0]
    }.pdf`
  );

};