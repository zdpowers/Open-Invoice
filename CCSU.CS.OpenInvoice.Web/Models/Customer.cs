using System.ComponentModel.DataAnnotations.Schema;

namespace CCSU.CS.OpenInvoice.Web.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Contact { get; set; }
        public string Address { get; set; }

        public string? Address2 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Zip { get; set; }

        public string Country { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string? Notes { get; set; }

        [NotMapped]
        public string CompleteAddress
        {

            get
            {
                var address = (string.IsNullOrEmpty(Address) ? "" : Address) + (string.IsNullOrEmpty(Address2) ? "" : " " + Address2);
                var city = (string.IsNullOrEmpty(City) ? "" : City) + (string.IsNullOrEmpty(State) ? "" : ", " + State) + (string.IsNullOrEmpty(Zip) ? "" : ", " + Zip);

                if (string.IsNullOrEmpty(address) && string.IsNullOrEmpty(city))
                    return "";

                return Name + "\n" + address + "\n" + City + ", " + State + " " + Zip;

            }

        }
    }
}
