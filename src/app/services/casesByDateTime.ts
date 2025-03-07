export async function CasesByDateTime(date: string) {
  try {
    const res = await fetch(
      `https://covid19-brazil-api.now.sh/api/report/v1/brazil/${date}`
    );
    console.log("data que veio do srvc", date);
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
