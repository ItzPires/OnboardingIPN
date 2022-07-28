namespace API.Database.Interfaces
{
    public interface ITools : IDisposable
    {
        IProjectDb ProjectDb { get; set; }
    }
}
