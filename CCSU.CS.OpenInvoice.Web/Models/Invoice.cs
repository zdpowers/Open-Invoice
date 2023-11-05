namespace CCSU.CS.OpenInvoice.Web.Models
{
    public class Invoice
    {
        public int Id { get; set; }

        public DateTime? Date { get; set; } = DateTime.Now;
        public DateTime? DueDate { get; set; }

        public string PaymentTerms { get; set; }

        public string Logo { get; set; }

        public string From { get; set; }

        public string BillTo { get; set; }

        public string Notes { get; set; }

        public string Terms { get; set; }

        public double SubTotal { get; set; }

        public double Tax { get; set; }

        public double Total { get; set; }



        public IEnumerable<LineItem> Items { get; set; }


    }

}
