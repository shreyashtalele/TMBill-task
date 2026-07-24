export function formatDate(
    dateValue,
    includeTime = true
) {
    if (!dateValue) {
        return "-";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    const options = {
        day: "2-digit",
        month: "short",
        year: "numeric",
    };

    if (includeTime) {
        options.hour = "2-digit";
        options.minute = "2-digit";
    }

    return new Intl.DateTimeFormat(
        "en-IN",
        options
    ).format(date);
}