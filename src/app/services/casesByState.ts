export async function CasesByState() {
  try {
    const res = await fetch("https://covid19-brazil-api.now.sh/api/report/v1");
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
