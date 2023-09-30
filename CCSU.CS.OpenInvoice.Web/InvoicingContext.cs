using CCSU.CS.OpenInvoice.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace CCSU.CS.OpenInvoice.Web
{
    public class InvoicingContext : DbContext
    {
        public DbSet<Company> Companies { get; set; }
        public DbSet<Customer> Customers { get; set; }


        public string DbPath { get; }

        public InvoicingContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Directory.CreateDirectory(System.IO.Path.Join(Environment.GetFolderPath(folder), "OpenInvoice"));
            DbPath = System.IO.Path.Join(path.FullName, "OpenInvoice.db");
        }

        // The following configures EF to create a Sqlite database file in the
        // special "local" folder for your platform.
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");
    }
}
