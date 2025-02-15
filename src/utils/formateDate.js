import { format } from "date-fns";

export const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return format(date, "hh:mm a");
};