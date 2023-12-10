namespace CCSU.CS.OpenInvoice.Web
{
    public class OpenInvoiceRunService:BackgroundService
    {
        public OpenInvoiceRunService(ILoggerFactory loggerFactory)
        {
            Logger = loggerFactory.CreateLogger<OpenInvoiceRunService>();
        }

        public ILogger Logger { get; }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            Logger.LogInformation("ServiceA is starting.");

            stoppingToken.Register(() => Logger.LogInformation("ServiceA is stopping."));

            while (!stoppingToken.IsCancellationRequested)
            {
                Logger.LogInformation("ServiceA is doing background work.");

                await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
            }

            Logger.LogInformation("ServiceA has stopped.");
        }
    }
}
