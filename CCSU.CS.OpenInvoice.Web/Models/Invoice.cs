using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CCSU.CS.OpenInvoice.Web.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public DateTime? Date { get; set; } = DateTime.Now;
        public DateTime? DueDate { get; set; }

        public string PaymentTerms { get; set; }

        [JsonIgnore]
        [NotMapped]
        public string? Logo { get; set; }

        public string From { get; set; }

        public string BillTo { get; set; }

        public string Notes { get; set; }

        public string Terms { get; set; }

        public double SubTotal { get; set; }

        public double Tax { get; set; }

        public double Total { get; set; }

        public int CustomerId { get; set; }

        public Customer? Customer { get; set; }

        public IEnumerable<LineItem> LineItems { get; set; } = Enumerable.Empty<LineItem>().ToList();


    }

}
