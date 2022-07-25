using Api.Classes.Models;
using Api.DataModel;
using System.Data.Entity;
using System.Data.Entity.Validation;

namespace ConsoleApplication
{
    class Program
    {
        static void Main(string[] args)
        {
            Database.SetInitializer(new NullDatabaseInitializer<ApiContext>());
            InsertAdm();
            Console.ReadKey();
        }



        private static void InsertAdm()
        {
            var adm = new User
            {
                Email = "admin@admin.pt",
                Deadline = new DateTime(2002, 1, 1),
                State = "ADM"

            };
            using (var context = new ApiContext())
            {
                try
                {
                    context.Database.Log = Console.WriteLine;
                    context.Users.Add(adm);
                    context.SaveChanges();
                }
                catch (DbEntityValidationException e)
                {
                    foreach (var eve in e.EntityValidationErrors)
                    {
                        Console.WriteLine("Entidade do tipo \"{0}\" no estado \"{1}\" tem os seguintes erros de validação:",
                            eve.Entry.Entity.GetType().Name, eve.Entry.State);
                        foreach (var ve in eve.ValidationErrors)
                        {
                            Console.WriteLine("- Property: \"{0}\", Erro: \"{1}\"",
                                ve.PropertyName, ve.ErrorMessage);
                        }
                    }
                }
            }
        }
    }
}