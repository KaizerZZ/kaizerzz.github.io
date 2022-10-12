let renderMHS = document.getElementById("data-mhs");
const dataMHS = [];
const addBtn = document.getElementById("add-btn");
const editBtn = document.getElementById("edit-btn");
const form = document.forms["mhs-form"];

let selectedIndex = null;

function editMode(id) {
	dataMHS.find((mhs, index) => {
		if (index === id) {
			form["nim-mhs"].value = mhs.nim;
			form["nama-mhs"].value = mhs.nama;
			selectedIndex = id;
		}
	});

	addBtn.classList.add("d-none");
	editBtn.classList.remove("d-none");
}

function resetMode() {
	addBtn.classList.remove("d-none");
	editBtn.classList.add("d-none");
	form["nim-mhs"].value = "";
	form["nama-mhs"].value = "";
}


// CRUD Mode
function renderData() {
	renderMHS.innerHTML = "";

	if (dataMHS.length != 0) {
		dataMHS.map((mhs, index) => {
			renderMHS.innerHTML += `
      <div class="col-md-4 my-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${mhs.nama}</h5>
            <p class="card-text">${mhs.nim}</p>
          </div>
          <div class="card-footer">
            <button onclick="editMode(${index})" class="btn btn-transparent">Edit</button>
            <button onclick="deleteMHS(${index})" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
      `;
		});
	} else {
		renderMHS.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Tidak ada Data</h5>
        </div>
      </div>
    `;
	}
}

function editMHS(id) {
	dataMHS.find((mhs, index) => {
		if (id === index) {
			mhs.nim = form["nim-mhs"].value;
			mhs.nama = form["nama-mhs"].value;
			selectedIndex = null;
			resetMode();
		}
	});
}

function deleteMHS(id) {
  const newData = dataMHS.filter((mhs, index) => id !== index);
  dataMHS.splice(0);
  dataMHS.push(...newData);
  renderData();
}

document.getElementById("mhs-form").addEventListener("submit", (e) => {
	e.preventDefault();
	if (!form["add-btn"].classList.contains("d-none")) {
		dataMHS.push({ nim: form["nim-mhs"].value, nama: form["nama-mhs"].value });
	} else {
		editMHS(selectedIndex);
	}
	renderData();
});

renderData();
