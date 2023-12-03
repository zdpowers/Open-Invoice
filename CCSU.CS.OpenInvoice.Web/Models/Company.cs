using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Loader;

namespace CCSU.CS.OpenInvoice.Web.Models
{
    public class Company
    {
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string Address { get; set; }

        public string? Address2 { get; set; }
        [Required]
        public string City { get; set; }

        public string State { get; set; }

        public string Zip { get; set; }

        public string Country { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string Email { get; set; }

        [Required]
        public string? Contact { get; set; }
        public string? Notes { get; set; }
        public string? Terms { get; set; }

        public string Logo { get; set; }

        [NotMapped]
        public string CompleteAddress {

            get {
                
                var address = (string.IsNullOrEmpty(Address) ? "" : Address) + (string.IsNullOrEmpty(Address2) ? "" : " " + Address2);
                var city = (string.IsNullOrEmpty(City) ? "" : City) + (string.IsNullOrEmpty(State) ? "" : ", " + State) + (string.IsNullOrEmpty(Zip) ? "" : ", " + Zip);

                if (string.IsNullOrEmpty(address) && string.IsNullOrEmpty(city))
                    return "";

                return Name + "\n" + address + "\n" + City + ", " + State + " " + Zip;
            }
        
        }




    }
}
