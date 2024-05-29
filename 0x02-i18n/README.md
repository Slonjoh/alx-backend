# Flask i18n and l10n Project

## Description

This project is a Flask application demonstrating internationalization (i18n) and localization (l10n). It displays content in different languages based on user preferences and localizes timestamps.

## Requirements

- Ubuntu 18.04 LTS
- Python 3.7

## Setup

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd flask_app
    ```

2. Create a virtual environment and activate it:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Initialize translations:
    ```bash
    pybabel extract -F babel.cfg -o messages.pot .
    pybabel init -i messages.pot -d app/translations -l en
    pybabel init -i messages.pot -d app/translations -l es
    pybabel init -i messages.pot -d app/translations -l fr
    ```

5. Compile translations:
    ```bash
    pybabel compile -d app/translations
    ```

6. Run the application:
    ```bash
    ./run.py
    ```

## Usage

Navigate to `http://127.0.0.1:5000/` in your web browser. The application will display content in the language based on your browser settings or URL parameters.

## Files and Directories

- `app/`: Contains the application code.
- `app/templates/`: HTML templates.
- `app/translations/`: Translation files.
- `run.py`: Entry point to run the Flask application.
- `babel.cfg`: Babel configuration for extracting translatable strings.
- `README.md`: Project documentation.
