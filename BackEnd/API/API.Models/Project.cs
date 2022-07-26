﻿using API.Models.Types;
using System.ComponentModel.DataAnnotations;

namespace API.Models
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
        [Required]
        public User Manager { get; set; }
}
}