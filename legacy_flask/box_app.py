import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np
from matplotlib.patches import FancyBboxPatch
import matplotlib.patches as patches

def create_3d_box():
    # Create figure and 3D axis
    fig = plt.figure(figsize=(12, 8))
    ax = fig.add_subplot(111, projection='3d')
    
    # Define box vertices
    # Bottom face (z=0)
    bottom = np.array([[0, 0, 0], [2, 0, 0], [2, 2, 0], [0, 2, 0], [0, 0, 0]])
    # Top face (z=2)
    top = np.array([[0, 0, 2], [2, 0, 2], [2, 2, 2], [0, 2, 2], [0, 0, 2]])
    
    # Box edges
    edges = [
        # Bottom edges
        [[0, 0, 0], [2, 0, 0]],
        [[2, 0, 0], [2, 2, 0]],
        [[2, 2, 0], [0, 2, 0]],
        [[0, 2, 0], [0, 0, 0]],
        # Top edges
        [[0, 0, 2], [2, 0, 2]],
        [[2, 0, 2], [2, 2, 2]],
        [[2, 2, 2], [0, 2, 2]],
        [[0, 2, 2], [0, 0, 2]],
        # Vertical edges
        [[0, 0, 0], [0, 0, 2]],
        [[2, 0, 0], [2, 0, 2]],
        [[2, 2, 0], [2, 2, 2]],
        [[0, 2, 0], [0, 2, 2]]
    ]
    
    # Draw edges
    for edge in edges:
        points = np.array(edge)
        ax.plot3D(points[:, 0], points[:, 1], points[:, 2], 'b-', linewidth=2, alpha=0.7)
    
    # Create faces with different colors/transparency
    # Define face vertices
    faces = [
        # Bottom face
        [[0, 0, 0], [2, 0, 0], [2, 2, 0], [0, 2, 0]],
        # Top face
        [[0, 0, 2], [2, 0, 2], [2, 2, 2], [0, 2, 2]],
        # Front face
        [[0, 0, 0], [2, 0, 0], [2, 0, 2], [0, 0, 2]],
        # Back face
        [[0, 2, 0], [2, 2, 0], [2, 2, 2], [0, 2, 2]],
        # Left face
        [[0, 0, 0], [0, 2, 0], [0, 2, 2], [0, 0, 2]],
        # Right face
        [[2, 0, 0], [2, 2, 0], [2, 2, 2], [2, 0, 2]]
    ]
    
    # Colors for each face
    face_colors = ['lightblue', 'lightgreen', 'lightcoral', 'lightyellow', 'lightpink', 'lightgray']
    
    # Draw faces
    from mpl_toolkits.mplot3d.art3d import Poly3DCollection
    
    for i, face in enumerate(faces):
        verts = [face]
        ax.add_collection3d(Poly3DCollection(verts, facecolors=face_colors[i], alpha=0.3, edgecolors='navy'))
    
    # Add text labels on faces (simulating logos)
    # Front face - Python
    ax.text(1, 0, 1, 'PYTHON', fontsize=12, ha='center', va='center', weight='bold')
    
    # Top face - AI/ML
    ax.text(1, 1, 2.1, 'AI/ML', fontsize=12, ha='center', va='center', weight='bold')
    
    # Right face - Flask
    ax.text(2.1, 1, 1, 'FLASK', fontsize=10, ha='center', va='center', weight='bold', rotation=90)
    
    # Left face - Data
    ax.text(-0.1, 1, 1, 'DATA', fontsize=10, ha='center', va='center', weight='bold', rotation=90)
    
    # Back face - ML
    ax.text(1, 2.1, 1, 'MACHINE\nLEARNING', fontsize=9, ha='center', va='center', weight='bold')
    
    # Set labels and title
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')
    ax.set_title('3D Tech Stack Visualization', fontsize=16, weight='bold')
    
    # Set equal aspect ratio
    ax.set_xlim([-0.5, 2.5])
    ax.set_ylim([-0.5, 2.5])
    ax.set_zlim([-0.5, 2.5])
    
    # Set viewing angle
    ax.view_init(elev=20, azim=45)
    
    # Remove grid for cleaner look
    ax.grid(True, alpha=0.3)
    
    # Set background color
    fig.patch.set_facecolor('white')
    ax.xaxis.pane.fill = False
    ax.yaxis.pane.fill = False
    ax.zaxis.pane.fill = False
    
    plt.tight_layout()
    return fig, ax

def animate_box():
    """Create an animated version of the box"""
    import matplotlib.animation as animation
    
    fig, ax = create_3d_box()
    
    def rotate(frame):
        ax.view_init(elev=20, azim=frame)
        return ax,
    
    # Create animation
    ani = animation.FuncAnimation(fig, rotate, frames=np.arange(0, 360, 2), 
                                interval=50, blit=False, repeat=True)
    
    return fig, ani

if __name__ == "__main__":
    print("Creating 3D Box Visualization...")
    print("Choose an option:")
    print("1. Static 3D Box")
    print("2. Animated Rotating Box")
    
    choice = input("Enter your choice (1 or 2): ").strip()
    
    if choice == "1":
        fig, ax = create_3d_box()
        plt.show()
        print("Static 3D box displayed!")
        
    elif choice == "2":
        print("Creating animated box... (this may take a moment)")
        fig, ani = animate_box()
        plt.show()
        print("Animated 3D box displayed!")
        
    else:
        print("Invalid choice. Showing static box by default.")
        fig, ax = create_3d_box()
        plt.show()
    
    # Save the figure
    save_choice = input("Save the visualization? (y/n): ").strip().lower()
    if save_choice == 'y':
        filename = input("Enter filename (without extension): ").strip()
        if not filename:
            filename = "3d_box_visualization"
        
        fig.savefig(f"{filename}.png", dpi=300, bbox_inches='tight')
        print(f"Saved as {filename}.png")