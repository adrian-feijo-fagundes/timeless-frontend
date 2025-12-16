import api from "./api";

export async function getGamification() {
    const { data } = await api.get("/gamification");
    return data;
}

export async function getAchievements() {
    const { data } = await api.get("/gamification/achievements");
    return data;
}
