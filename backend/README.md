# Running locally

In the current folder, execute the following commands:

1. Create a new Python virtual environment:
   ```bash
   python -m venv .venv
   ```
2. Activate the virtual environment:
   ```bash
   .venv/Scripts/activate
   ```
3. Install the required dependencies using pip:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the database migrations (Installs the data model):
   ```bash
   python manage.py migrate
   ```
   
5. Run the server using the following command:
   ```bash
   python manage.py runserver
   ```
