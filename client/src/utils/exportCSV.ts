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
  
  export const exportCSV = (
    transactions: Transaction[]
  ) => {
  
    const headers = [
      "Transaction ID",
      "Type",
      "Amount",
      "Sender",
      "Receiver",
      "Date",
    ];
  
    const rows = transactions.map((item) => [
      item._id,
      item.type,
      item.amount,
      item.sender?.fullName ?? "-",
      item.receiver?.fullName ?? "-",
      new Date(item.createdAt).toLocaleString("en-IN"),
    ]);
  
    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
  
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });
  
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
  
    link.href = url;
  
    link.download = `Transaction-History-${
      new Date().toISOString().split("T")[0]
    }.csv`;
  
    link.click();
  
    URL.revokeObjectURL(url);
  
  };