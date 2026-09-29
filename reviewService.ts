import type { User, Review } from './models.js';
import { rawMockCompanies } from './mockData.js';
import { CompanyManager, Guest, Reviewer } from './models.js';

export const getCurrentUser = (): User => {  // ← ประกาศว่าคืน "User"
    if (localStorage.getItem('isLoggedIn') === 'true') {
        try {
            const u = JSON.parse(localStorage.getItem('userData') || '{}');
            return new Reviewer(u.id, u.email_uni); // Reviewer เป็น User
        } catch { }
    }
    return new Guest(); //Guest เป็น User
};

export const createCompanyManager = (): CompanyManager => {
    const manager = new CompanyManager();
    manager.loadMockData(rawMockCompanies);
    manager.getAllCompanies().forEach(c => {
        const { avg, count } = getCompanyStats(c.getCompanyInfo().id);
        c.setStats(avg, count);
    });
    return manager;
};

export const getAllReviews = (): Review[] => {
    try {
        const parsed = JSON.parse(localStorage.getItem('user_reviews') || '[]');
        return Array.isArray(parsed) ? parsed : [parsed];
    } catch { return []; }
};

export const saveAllReviews = (reviews: Review[]): void =>
    localStorage.setItem('user_reviews', JSON.stringify(reviews));

export const getCompanyStats = (companyId: string) => {
    const list = getAllReviews().filter(r => String(r.companyId) === String(companyId));
    const count = list.length;
    const avg = count ? list.reduce((s, r) => s + (Number(r.rating) || 0), 0) / count : 0;
    return { avg, count };
};

export const fillCompanySidebar = (companyId: string): void => {
    const company = createCompanyManager().findById(companyId);
    const { avg, count } = getCompanyStats(companyId);

    const img = document.getElementById('company-img') as HTMLImageElement | null;
    const name = document.getElementById('company-name');
    const rating = document.getElementById('company-rating');
    const cnt = document.getElementById('company-review-count');
    const stars = document.querySelectorAll<HTMLElement>('#company-stars i');

    if (company && img) img.src = company.imageUrl;
    if (company && name) name.textContent = company.name;
    if (rating) rating.textContent = count ? avg.toFixed(1) : '-';
    if (cnt) cnt.textContent = `Based on ${count} Reviews`;
    stars.forEach((s, i) => {
        s.classList.toggle('text-gray-300', i >= Math.round(avg));
    });
};