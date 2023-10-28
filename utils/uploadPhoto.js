export async function uploadPhoto(file) {
  try {
    const response = await fetch(
      "https://www.filestackapi.com/api/store/S3?key=ATmxns9QQ2OhhpR6rmotZz",
      {
        method: "POST",
        headers: {
          "Content-Type": "image/png",
        },
        body: file.data,
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
}
