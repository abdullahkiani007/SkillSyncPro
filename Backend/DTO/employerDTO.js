class EmployerDTO {
  constructor(employer) {
    this.id = employer._id;
    this.isAdmin = employer.isAdmin;
    this.createdAt = employer.createdAt;
    this.updatedAt = employer.updatedAt;
    this.companyId = employer.company;

    // User-specific fields
    this.user = {
      id: employer.user._id,
      email: employer.user.email,
      firstName: employer.user.firstName,
      lastName: employer.user.lastName,
      role: employer.user.role,
      createdAt: employer.user.createdAt,
      updatedAt: employer.user.updatedAt,
      profilePicture: employer.user.profilePicture || "",
      phone: employer.user.phone || "",
      address: employer.user.address || "",
      bio: employer.user.bio || "",
    };
  }
}

module.exports = EmployerDTO;
