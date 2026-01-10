from flask import Flask, render_template, request, redirect, url_for

# Initialize the Flask application
app = Flask(__name__, static_folder='static', template_folder='templates')

# Define routes for different pages
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/skills')
def skills():
    return render_template('skills.html')


@app.route('/projects')
def projects():
    
    projects = []
    return render_template('projects.html', projects=projects)

# Define route for contact page with GET and POST methods
# The POST method can be used to handle form submissions and is how what you typed gets sent to a server that can process it and use it.  
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        return redirect(url_for('index'))
    return render_template('contact.html')


if __name__ == '__main__':
    app.run(debug=True)
