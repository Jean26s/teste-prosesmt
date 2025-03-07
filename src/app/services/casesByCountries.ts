export async function CasesByCountries() {
  try {
    const res = await fetch(
      "https://covid19-brazil-api.now.sh/api/report/v1/countries"
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
