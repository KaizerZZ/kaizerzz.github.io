let renderProvinsi = $("#covid-provinsi")[0];

async function getDataSummary() {
  await $.ajax({
    type: "GET",
    url: "https://dekontaminasi.com/api/id/covid19/stats",
    data: { get_param: "value" },
    dataType: "json",
    success: (data) => {
      //   console.log(data);
      $("#infected")[0].innerHTML = `${new Intl.NumberFormat().format(
        data.numbers.infected
      )} Orang`;
      $("#recovered")[0].innerHTML = `${new Intl.NumberFormat().format(
        data.numbers.recovered
      )} Orang`;
      $("#fatal")[0].innerHTML = `${new Intl.NumberFormat().format(
        data.numbers.fatal
      )} Orang`;
    },
  });
}

async function getDataRegions() {
  renderProvinsi.innerHTML = "";

  await $.ajax({
    type: "GET",
    url: "https://dekontaminasi.com/api/id/covid19/stats",
    data: { get_param: "value" },
    dataType: "json",
    success: (data) => {
      const regions = data.regions;
      regions.map((region) => {
        renderProvinsi.innerHTML += `
            <div class="col-3 mb-5">
              <div class="col">
                <div class="card h-100">
                  <div class="card-body">
                    <h5 class="card-title fw-bold">${region.name}</h5>
                    <div class="card-text">
                       <ul>
                         <li>Positif: ${new Intl.NumberFormat().format(region.numbers.infected)} Orang</li>
                         <li>Sembuh: ${new Intl.NumberFormat().format(region.numbers.recovered)} Orang</li>
                         <li>Meninggal: ${new Intl.NumberFormat().format(region.numbers.fatal)} Orang</li>
                       </ul>
                    </div>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">Last updated 3 mins ago</small>
                  </div>
                </div>
              </div>
            </div>
        `;
      });
    },
  });
}

$(document).ready(() => {
  if (top.location.pathname === "/uts/index.html") {
    getDataSummary();
  } else if (top.location.pathname === "/uts/list-provinsi.html") {
    getDataRegions();
  }
});
