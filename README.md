## Validator

Is a Thunderbird plugin in development, it's to detect when the real sender is not sending that email you received, for example in phishing, credit fraud, etc… It's in development because need to finish the front end, the plugin itself and keep doing the research to get a better score, also getting more information of emails, so it can detect when is not the real sender.

## Values
The values here is to use a scale from 5 to 0, 5 showing that is a trustful email, and 0 that must be an untrusted email (Phishing, etc...)
It can also display a number 6, when this happens because the sender is not in the DB, so it can mean 2 things, we just don't have collected information about that email direction, or it's trying to make a phishing email with a similar sender so it's not in the DB, so you must be careful.
The color of the background also indicate de score (Grey, Green, Orange, Red)

## WhiteList (Add Email)
You can add an email that is not in the database (In case your score is 6) or you can add an email, so the plugin can work better, and give a better solution.

## BlackList
(BLACK LIST WHEN AN EMAIL IS NOT FROM THE SENDER ITS SAYING IT IS,  TRYING TO SUPPLANT AN IDENTITY. (COULD BE AN EMAIL THAT IS TRYING TO DO PHISHING) BUT DONT BLACKLIST AN MESSAJE THAT IS JUST AADVERTISEMENT.
You can blacklist an email address, when the score is below 2 or if is not in the DB (Score of 6), and its affect the score given when another user ask for that email direction. 

# Privacy
This plugin WILL NOT storage any of your information and will never read the body of the email (Where the message of the sender is).
In case you add a new email (Whitelist) or add an email to BlackList, it will only save some headers, and will NEVER save your email address.
# Installation

1. clone the repository.
2. Get into the folder "Validator-TB-Plugin".
3. Run `make` to generate the `xpi` file.
4. ![XPI]
5. In Thunderbird, go to the `Add-ons Manager`.
6. Click `Install Add-on From File...` and select the `xpi` file from the folder of step 2.
![INSTALL](https://github.com/CasperClous/Validator-TB-Plugin/blob/main/Install.gif)

## A little more help
If you want to help more in this project, and I will be very grateful, you can use the python file name Cliente.py, is to fill the DB faster, Try to make sure that you have legit emails. (GMAIL)
