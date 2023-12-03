using CCSU.CS.OpenInvoice.Web.Models;
using CCSU.CS.OpenInvoice.Web.Models.SampleData;
using Microsoft.EntityFrameworkCore;

namespace CCSU.CS.OpenInvoice.Web
{
    public class InvoicingContext : DbContext
    {
        public DbSet<Company> Companies { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<LineItem> LineItems { get; set; }
        public DbSet<Invoice> Invoices { get; set; }


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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Company>().HasData(SampleData.Company);
            modelBuilder.Entity<Customer>().HasData(SampleData.Customers);
            modelBuilder.Entity<Invoice>().HasData(SampleData.GetInvoices());
            modelBuilder.Entity<LineItem>().HasData(SampleData.LineItems);



        }
    }
}
