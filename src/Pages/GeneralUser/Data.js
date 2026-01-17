import api from "../../api/axios";

export const getMonthlyJoined = async () => {
  const res = await api.get("/members/monthly-member");
  return res.data;
};

export const threeDayExpire = async () => {
  const res = await api.get("/members/within-3-days-expiring");
  return res.data;
};

export const fourToSevenExpire = async () => {
  const res = await api.get("/members/within-4-7-expiring");
  return res.data;
};

export const getExpiredMembers = async () => {
  const res = await api.get("/members/expired-member");
  return res.data;
};

export const getInactiveMembers = async () => {
  const res = await api.get("/members/inactive-member");
  return res.data;
};
