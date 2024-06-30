# Using flask to make an api
# import necessary libraries and functions
from flask import Flask, jsonify, request, make_response, send_file, json, render_template
from flask_cors import CORS
import networkx as nx
from networkx.drawing.nx_agraph import write_dot, graphviz_layout
import matplotlib
import matplotlib.pyplot as plt
from io import BytesIO

# creating a Flask app
app = Flask(__name__)
CORS(app)

matplotlib.use("agg")

# Creating a global graph object to store all relationships
G = nx.DiGraph()

@app.route('/')
def home():
    return render_template('index.html')

# on the terminal type: curl http://127.0.0.1:5000/
@app.route("/addrelationship", methods=["POST"])
def addrelationship():
    global G
    details = request.data
    decoded = json.loads(details)
    testing = eval(decoded)
    
    for item in testing:
        fentity = item["fentity"]
        relationship = item["relationship"]
        sentity = item["sentity"]
        
        # Add nodes and edges to the graph
        G.add_node(fentity, name=fentity)
        G.add_node(sentity, name=sentity)
        G.add_edge(
            fentity,
            sentity,
            relation=f"{fentity} {relationship} {sentity}"
        )
    
    # Drawing the graph
    pos = nx.spring_layout(G)
    plt.figure()
    nx.draw(G, pos, with_labels=True, node_color='lightblue', edge_color='gray', node_size=5000, font_size=10)
    edge_labels = nx.get_edge_attributes(G, 'relation')
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, font_color='red')
    
    img = BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()
    
    return send_file(img, mimetype='image/png')

# driver function
if __name__ == "__main__":
    app.run(debug=True)
