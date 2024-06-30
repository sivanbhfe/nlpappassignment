from flask import Flask, request, send_file, render_template
from flask_cors import CORS
import networkx as nx
import matplotlib
import matplotlib.pyplot as plt
from io import BytesIO

app = Flask(__name__)
CORS(app)

matplotlib.use("agg")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/addrelationship", methods=["POST"])
def addrelationship():
    details = request.get_json()  # Get the JSON data from the request
    G = nx.DiGraph()

    for item in details:
        fentity = item["fentity"]
        sentity = item["sentity"]
        relationship = item["relationship"]

        G.add_node(fentity, name=fentity)
        G.add_node(sentity, name=sentity)
        G.add_edge(fentity, sentity, relation=f"{fentity} {relationship} {sentity}")

    pos = nx.spring_layout(G)
    nx.draw(G, pos, with_labels=True)
    edge_labels = nx.get_edge_attributes(G, "relation")
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels)

    img = BytesIO()
    plt.savefig(img, format="png")
    img.seek(0)
    plt.clf()

    return send_file(img, mimetype="image/png")


if __name__ == "__main__":
    app.run(debug=True)
