import { menuItems } from '../constants.js';

const defaultSettings = 
    {
        "theme": "dark",
        "visitorName": "John Doe",
        "lastVisit": "2026-11-01"
    };

const storageKey = 'userSettings';

let loadedSettings;

try 
    {
    const rawData = localStorage.getItem(storageKey);
    
        if (rawData) 
            {
                loadedSettings = JSON.parse(rawData);
            } 
        else 
            {
                loadedSettings = defaultSettings;
                localStorage.setItem(storageKey, JSON.stringify(defaultSettings));
            }
    } 
    catch (error) 
        {
            console.error("Error reading from storage, using defaults:", error);
            loadedSettings = defaultSettings;
        }

    if (loadedSettings["theme"] === "dark") 
    {
        document.documentElement.style.backgroundColor = "#000000";
        document.documentElement.style.color = "#FFFFFF";
    }
    else
    {
        document.documentElement.style.backgroundColor = "#FFFFFF";
        document.documentElement.style.color = "#000000";
    }

function validateName()
    {
        document.getElementById("nameInput").addEventListener("input", function(event)
        {
            const nameInput = event.target.value;

            if (nameInput === "")
            {
                document.getElementById("nameError").textContent = "Name is required.";
                document.getElementById("successName").style.visibility = "hidden";
            } else {
                document.getElementById("nameError").textContent = "";
                document.getElementById("successName").style.visibility = "visible";
            }
        });

        if (document.getElementById("nameInput").value === "")
        {
            document.getElementById("nameError").textContent = "Name is required.";
        } else {
            document.getElementById("nameError").textContent = "";
        }
        document.getElementById("successName").style.visibility = "hidden";
    }

function validateEmail()
    {
        document.getElementById("emailInput").addEventListener("input", function(event)
        {
            const emailInput = event.target.value;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailInput === "")
            {
                document.getElementById("emailError").textContent = "Email is required.";
                document.getElementById("successEmail").style.visibility = "hidden";
            } else if (!emailPattern.test(emailInput)) {
                document.getElementById("emailError").textContent = "Please enter a valid email address.";
                document.getElementById("successEmail").style.visibility = "hidden";
            } else {
                document.getElementById("emailError").textContent = "";
                document.getElementById("successEmail").style.visibility = "visible";
            }
        });
        
        if (document.getElementById("emailInput").value === "")
        {
            document.getElementById("emailError").textContent = "Email is required.";
        } else {
            document.getElementById("emailError").textContent = "";
        }
        document.getElementById("successEmail").style.visibility = "hidden";
    }

function validateMessage()
    {
        document.getElementById("messageInput").addEventListener("input", function(event)
        {
            const messageInput = event.target.value;

            if (messageInput === "")
            {
                document.getElementById("messageError").textContent = "Message is required.";
                 document.getElementById("successMessage").style.visibility = "hidden";
            } else {
                document.getElementById("messageError").textContent = "";
                document.getElementById("successMessage").style.visibility = "visible";
            }
        });

        if (document.getElementById("messageInput").value === "")
        {
            document.getElementById("messageError").textContent = "Message is required.";
        } else {
            document.getElementById("messageError").textContent = "";
        }
        document.getElementById("successMessage").style.visibility = "hidden";
    }

    function renderNavigation()
    {
        document.querySelector(".nav-menu").innerHTML = menuItems.map(item => `<li><a href="${item.href}">${item.name}</a></li>`).join("");
    }

window.onload = function()
    {
        loadedSettings["lastVisit"] = new Date().toISOString();
        localStorage.setItem(storageKey , JSON.stringify(loadedSettings));

        document.getElementById("themeToggle").addEventListener("click", function()
        {
            if (loadedSettings["theme"] === "dark")
                {
                    loadedSettings["theme"] = "light";
                    document.documentElement.style.backgroundColor = "#FFFFFF";
                    document.documentElement.style.color = "#000000";
                }
            else
                {
                    loadedSettings["theme"] = "dark";
                    document.documentElement.style.backgroundColor = "#000000";
                    document.documentElement.style.color = "#FFFFFF";
                }

            localStorage.setItem(storageKey, JSON.stringify(loadedSettings));
        });

        document.getElementById("menuToggle").addEventListener("click", function()
        {
            const navMenu = document.querySelector(".nav-menu");
            navMenu.style.visibility = (navMenu.style.visibility === "visible" || navMenu.style.visibility === "") ? "hidden" : "visible";
        });

        renderNavigation();
        validateName();     
        validateMessage();
        validateEmail();

    }