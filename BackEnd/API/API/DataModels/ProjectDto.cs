﻿using API.Models;

namespace API.DataModels
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public float Budget { get; set; }
        public int State { get; set; }
        public User Manager { get; set; }
    }
}