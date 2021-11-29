## Validator

Is a Thunderbird plugin in development, it's to detect when the real sender is not sending that email you received, for example in phishing, credit fraud, etc… It's in development because need to finish the front end, the plugin itself and keep doing the research to get a better score, also getting more information of emails, so it can detect when is not the real sender.

## Values
The values here is to use a scale from 5 to 0, 5 showing that is a trustful email, and 0 that must be an untrusted email (Phishing, etc...)
It can also display a number 6, when this happens because the sender is not in the DB, so it can mean 2 things, we just don't have collected information about that email direction, or it's trying to make a phishing email with a similar sender so it's not in the DB, so you must be careful.

## WhiteList (Add Email)
You can add an email that is not in the database (In case your score is 6) or you can add an email, so the plugin can work better, and give a better solution.

## BlackList
You can blacklist an email address, when the score is below 2 or if is not in the DB (Score of 6), and its affect the score given when another user ask for that email direction. 

## In development
Change the color of the circle at the side of the name, changes in function of the score:
Green is when the score is 4.0 or higher.
Yellow is when the score is between 3.9 and 2.5.
Red is when the score is below 2.4.
Grey is the default color or when the email is not at the DB (score of 6).

# Privacy
This plugin WILL NOT storage any of your information and will never read the body of the email (Where the message of the sender is).
In case you add a new email (Whitelist) or add an email to BlackList, it will only save some headers, and will NEVER save your email address.
# Installation

1. Download the source code.
2. ![Download](https://github.com/CasperClous/Validator-TB-Plugin/blob/main/clone.gif)
3. Get into the folder "Validator-TB-Plugin".
4. Run `make` to generate the `xpi` file.
5. ![XPI](https://github.com/CasperClous/Validator-TB-Plugin/blob/main/XPI.gif)
6. In Thunderbird, go to the `Add-ons Manager`.
7. Click `Install Add-on From File...` and select the `xpi` file from step 2.
8. ![INSTALL](https://github.com/CasperClous/Validator-TB-Plugin/blob/main/PlugInstal.gif)
