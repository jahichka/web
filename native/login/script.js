function Verification() {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    fetch(`http://192.168.35.215:8080/login?email=${user}&password=${pass}`)
        .then(response => response.json())
        .then(            window.location.href = '../home/home.html')

}
