# Nav

## Nav.Dropdown and Nav.Menu

Nav.Dropdown is a legacy API that is discouraged for using in the future.
It existed for the purpose of decoupling the usage of Dropdown component within Nav.
For that purpose, Dropdown APIs are mapped to Nav.Dropdown

- Dropdown -> Nav.Dropdown
- Dropdown.Menu -> Nav.Dropdown.Menu
- Dropdown.Item -> Nav.Dropdown.Item

The Nav API then became too verbose, thus a simplified API is suggested.

- Nav.Dropdown -> Nav.Menu within Nav
- Nav.Dropdown.Item -> Nav.Item within Nav.Menu
- Nav.Dropdown.Menu -> Nav.Menu within another Nav.Menu
