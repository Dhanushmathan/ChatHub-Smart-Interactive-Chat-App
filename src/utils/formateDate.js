import { format } from "date-fns";

export const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return format(date, "hh:mm a");
};

export const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
    
    if (dateOnly.getTime() === todayOnly.getTime()) {
        return "Today - " + format(date, " hh:mm a");
    } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
        return "Yesterday - " + format(date, " hh:mm a");
    } else if (dateOnly.getTime() >= todayOnly.getTime() - 7 * 24 * 60 * 60 * 1000) {
        return format(date, "EEEE");
    } else {
        return format(date, "MMM d, yyyy");
    }
};