using Api.Classes.Types;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api.Classes.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public float Budget { get; set; }
        [Required]
        public ProjectState State { get; set; }
        //[Required]
        //public User? Manager { get; set; }
    }
}
