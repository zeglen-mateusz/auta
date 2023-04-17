function Edit(id) {
  console.log("tak");
  const data = JSON.stringify({ id: id });
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  };

  fetch("/edit", options).catch((error) => console.log(error));
  location.reload();
}

function Cancel(id) {
  const data = JSON.stringify({ id: id });
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  };
  fetch("/cancel", options).catch((error) => console.log(error));
  location.reload();
}
function Edit2(id) {
  let ubezpieczony = document.querySelector("#ubezpieczony").value;
  let benzyna = document.querySelector("#benzyna").value;
  let uszkodzony = document.querySelector("#uszkodzony").value;
  let naped = document.querySelector("#naped").value;
  const data = JSON.stringify({
    id: id,
    ubezpieczony: ubezpieczony,
    benzyna: benzyna,
    uszkodzony: uszkodzony,
    naped: naped,
  });
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  };
  fetch("/edit2", options)
    .then((data) => Cancel(id))
    .catch((error) => console.log(error));
}
