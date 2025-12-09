import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Drawer from "../components/Drawer";
import { StyledEngineProvider } from "@mui/material/styles";
import { useSupabase } from "../components/SupabaseContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

const CategoriasPage = () => {
  const supabase = useSupabase();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCategoria, setCurrentCategoria] = useState(null);
  const [descripcionCategoria, setDescripcionCategoria] = useState("");

  const fetchCategorias = async () => {
    try {
      const { data, error } = await supabase.from("categoria").select("*");
      if (error) throw error;
      setCategorias(data || []);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCategoria = async () => {
    try {
      if (currentCategoria) {
        const { error } = await supabase
          .from("categoria")
          .update({ descripcion: descripcionCategoria })
          .eq("id", currentCategoria.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("categoria")
          .insert({ descripcion: descripcionCategoria });
        if (error) throw error;
      }
      setOpenDialog(false);
      fetchCategorias();
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    }
  };

  const handleDeleteCategoria = async (id) => {
    try {
      const { error } = await supabase.from("categoria").delete().eq("id", id);
      if (error) throw error;
      fetchCategorias();
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  const openDialogHandler = (categoria = null) => {
    setCurrentCategoria(categoria);
    setDescripcionCategoria(categoria ? categoria.descripcion : "");
    setOpenDialog(true);
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <React.Fragment>
      <Container sx={{ marginTop: 2 }}>
        <StyledEngineProvider injectFirst>
          <Drawer />
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <Typography variant="h4" gutterBottom>
              Categorías
            </Typography>
            <IconButton
              color="primary"
              onClick={() => openDialogHandler()}
              aria-label="Agregar nueva categoría"
            >
              <Add />
            </IconButton>
          </div>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Descripcion</b></TableCell>
                  <TableCell align="right"><b>Acciones</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Cargando categorías...
                    </TableCell>
                  </TableRow>
                ) : (
                  categorias.map((categoria) => (
                    <TableRow key={categoria.id}>
                      <TableCell>{categoria.descripcion}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => openDialogHandler(categoria)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          onClick={() => handleDeleteCategoria(categoria.id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>
              {currentCategoria ? "Editar Categoría" : "Crear Nueva Categoría"}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Descripcion de la Categoría"
                fullWidth
                value={descripcionCategoria}
                onChange={(e) => setDescripcionCategoria(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpenDialog(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveCategoria}
              >
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        </StyledEngineProvider>
      </Container>
    </React.Fragment>
  );
};

export default CategoriasPage;
