# Application Setup and Usage

## Prerequisites

- Ensure you have Python 3 installed on your system. You can download it from [python.org](https://www.python.org/).

## Setting Up the Virtual Environment

Follow these steps to create and activate a virtual environment for your application:

1. **Create the Virtual Environment**

   ```bash
   python3 -m venv .venv
   ```

2. **Activate the Virtual Environment**

    * For Linux / MacOS
        ```bash
        source .venv/bin/activate
        ```
    * For Windows
        ```cmd
        .venv\Scripts\activate
        ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

## Launching the Application

1. **Ensure the Virtual Environment is Activated**
    
    Make sure you have activated the virtual environment as described above.

2. **Run the Application**

    ```bash
    python app.py
    ```

3. **Access the Webpage**

    Open your web browser and navigate to: http://localhost:5000

4. **Deactivating the Environment**
    
    After you are done with your work, you can deactivate the virtual environment by running:

    ```bash
    deactivate
    ```

## Network Details

* IP Address:   `localhost`
* Port:         `5000`

## Troubleshooting

* **Virtual Environment Issues:** If you encounter issues with the virtual environment, ensure you have the correct version of Python and have followed the activation steps correctly.

* **Dependency Installation Problems:** If some dependencies fail to install, check the `requirements.txt` for any typos or version conflicts and ensure your network connection is stable.

* **Application Errors:** Check the console output for any error messages. Common issues may include missing environment variables or misconfigured settings.

## Additional Resources

* [Python Documentation](https://docs.python.org/3/)

* [Virtual Environment Documentation](https://docs.python.org/3/library/venv.html)

* [Pip Documentation](https://pip.pypa.io/en/stable/)
