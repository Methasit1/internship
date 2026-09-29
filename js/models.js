// 1. Abstraction 
export class User {
    id;
    constructor(id) { this.id = id; }
    getId() { return this.id; }
}
// Inheritance เชื่อมจาก class User
export class Guest extends User {
    constructor(id = 'guest') { super(id); }
    getRoleName() { return "Guest"; }
    canWriteReview() { return false; }
    canEditReview(_ownerId) { return false; }
}
// Inheritance เชื่อมจาก class User
export class Reviewer extends User {
    email;
    constructor(id, email) {
        super(id); // ส่ง id ให้แม่เก็บ
        if (!email.toLowerCase().endsWith("@up.ac.th"))
            throw new Error("Invalid Email");
        this.email = email;
    }
    getEmail() { return this.email; }
    getRoleName() { return "Reviewer"; }
    canWriteReview() { return true; }
    canEditReview(ownerId) { return this.id === ownerId; }
}
// 3. Encapsulation
export class Company {
    id;
    name;
    address;
    roles;
    internCount;
    imageUrl;
    rating = 0;
    reviewCount = 0;
    constructor(id, name, address, roles, internCount, imageUrl) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.roles = roles;
        this.internCount = internCount;
        this.imageUrl = imageUrl;
    }
    setStats(rating, reviewCount) {
        this.rating = Math.min(5, Math.max(0, rating));
        this.reviewCount = Math.max(0, Math.floor(reviewCount));
    }
    getCompanyInfo() {
        return {
            id: this.id,
            name: this.name,
            address: this.address,
            roles: this.roles,
            internCount: this.internCount,
            imageUrl: this.imageUrl,
            rating: this.rating,
            reviewCount: this.reviewCount
        };
    }
}
// interface class ทั่วไป
export class CompanyManager {
    companies = [];
    getAllCompanies() { return this.companies; }
    loadMockData(mockData) {
        for (const data of mockData) {
            this.companies.push(new Company(data.id, data.name, data.address, data.roles, data.count, data.imageUrl));
        }
    }
    findById(id) {
        return this.companies
            .find(c => c.getCompanyInfo().id === String(id))
            ?.getCompanyInfo();
    }
    search(keyword) {
        const k = keyword.trim().toLowerCase();
        if (!k)
            return this.companies;
        return this.companies.filter(c => {
            const i = c.getCompanyInfo();
            return i.name.toLowerCase().includes(k)
                || i.address.toLowerCase().includes(k)
                || i.roles.some(r => r.toLowerCase().includes(k));
        });
    }
}
//# sourceMappingURL=models.js.map