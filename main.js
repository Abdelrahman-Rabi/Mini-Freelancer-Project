const freelancer = document.getElementById("freelancer")
const lookingForFreelancer = document.getElementById("looking-for-freelancer")

const page1 = document.getElementById("page1")
const page2 = document.getElementById("page2")
const page3 = document.getElementById("page3")

freelancer.addEventListener('click', function(event){
    page1.classList.add("hide")
    page2.classList.remove("hide")
})

lookingForFreelancer.addEventListener('click', function(event){
    page1.classList.add("hide")
    page3.classList.remove("hide")
})

const miniSkill = {
    developer:['js','html','php'],
    design:['photoshop','illsturater','graphic'],
    writer:['articals','SEO','social media']
}

const sub_Menu = document.getElementById('sub_Menu')

function subMinu() {
    sub_Menu.innerHTML=""
    const value = document.getElementById('skill').value
    
    for (key in miniSkill){
        if (key === value) {
            miniSkill[key].forEach(function(elem,index){
                const option = document.createElement('option')
                option.append(document.createTextNode(elem))
                option.value = elem
                sub_Menu.append(option)
            })
        }
    }
}

const skillsContainer = document.getElementById('skillsContainer')

let skills = []
document.getElementById('btn_skill').addEventListener('click', function(event){
    event.preventDefault()
    const radio = document.querySelector('input[name="level"]:checked').value
    const subMenuValue = sub_Menu.value

    const skill = {
        radio: radio,
        subMenuValue:subMenuValue
    }
    skills.push(skill)

    skillContainer = document.createElement('div')
    skillContainer.id = skill.subMenuValue
    skillContainer.innerHTML = `<p>${skill.radio}</p> -- <p>${skill.subMenuValue}</p><br />`

    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'delete'
    deleteButton.id = skill.subMenuValue
    deleteButton.addEventListener('click', function(event){
        event.preventDefault()
        skills = skills.filter(skill => skill.subMenuValue !== deleteButton.id)
        skillContainer.innerHTML = ""
    })
    skillContainer.append(deleteButton)

    skillsContainer.append(skillContainer)
    
    console.log(skills)
  });

//   function deleteSkill(event, deleteButtonId) {
//     event.preventDefault()
//     skills = skills.filter(skill => skill.subMenuValue !== deleteButtonId)
//     for(let i = 0; i < skillsContainer.children.length; i++){
//         if (skillsContainer.children[i].id === deleteButtonId){
//             skillsContainer.children[i].innerHTML =""
//         }
//     }
//   }

const langsContainer = document.getElementById('langsContainer')
let langs = []
document.getElementById('btn_add_Lang').addEventListener('click',function(event){
    event.preventDefault()
    // saving values from DDL in langs array
    const oLang = document.getElementById('oLang').value
    const level = document.getElementById('level').value
    const lang = {
        oLang:oLang,
        level:level
    }
    langs.push(lang)
    // creating div and push oLang in it
    const oLang_div = document.createElement('div')
    oLang_div.innerHTML = `<p>${lang.oLang}</p> -- <p>${lang.level}</p><br />`
    langsContainer.append(oLang_div)
    // creating delete button
    const btn_delete = document.createElement('button')
    btn_delete.innerHTML = 'delete'
    langsContainer.append(btn_delete)
    // function delet
        btn_delete.addEventListener('click',function(event){
            event.preventDefault()

        })
})

// local Storage

const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
const country = document.getElementById('country')
const paypal = document.getElementById('paypal')
const wire_transfer = document.getElementById('wire_transfer')
const western_union = document.getElementById('western_union')

const saveProfile = document.getElementById('save-profile')
saveProfile.addEventListener('click',function(event){
    event.preventDefault()

    if(fname.value === "" || lname.value === ""){
        alert("Fill your full name please...")
        return
    }
    const profile = {
        personal:{
            firstName: fname.value,
            lastName: lname.value,
            country: country.value,
        },
        languages: langs,
        skills: skills,
        payment:{
            paypal: paypal.checked,
            wire_transfer: wire_transfer.checked,
            western_union: western_union.checked,
        }
    }

    if(!localStorage.getItem("profiles")){
        localStorage.setItem("profiles", JSON.stringify([]))
    }
    const currentProfiles = JSON.parse(localStorage.getItem("profiles"))
    console.log(typeof (currentProfiles))
    currentProfiles.push(profile)
    localStorage.setItem("profiles", JSON.stringify(currentProfiles))

    page2.classList.add("hide")
    page3.classList.remove("hide")
    fetchProfiles()
})

const profileContainer = document.getElementById("profiles-container")

function fetchProfiles() {
    const profiles = JSON.parse(localStorage.getItem("profiles"))
    console.log(profiles)

    profileContainer.innerHTML= ""
    profiles.forEach(profile => {
        profileContainer.innerHTML +=
        `<div>
        <p>First name: ${profile.personal.firstName}</p>
        <p>Last name: ${profile.personal.lastName}</p>
        <p>Contry: ${profile.personal.country}</p>
        <p>languages: ${
            profile.languages.map(lang => {
                return(`${lang.oLang} - ${lang.level} <br />`)
            })
        }
        <p>skills: ${
            profile.skills.map(skill => {
                return(`${skill.radio} - ${skill.subMenuValue} <br />`)
            })
        }
        ${profile.payment.paypal ? "<p>PayPal</p>" : ""}
        ${profile.payment.western_union ? "<p>western_union</p>" : ""}
        ${profile.payment.wire_transfer ? "<p>wire_transfer</p>" : ""}
        </div>
        <hr />`
    }
    );
}
fetchProfiles()