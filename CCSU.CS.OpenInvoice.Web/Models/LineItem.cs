using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CCSU.CS.OpenInvoice.Web.Models

{
    public class LineItem {

        
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public string Description { get; set; }
        public int? Qty { get; set; }
        public double? Price { get; set; }
        public double? TotalPrice { get; set; }



    }

}
